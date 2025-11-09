// Types
export interface ModalOptions {
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  lockScroll?: boolean
  trapFocus?: boolean
  initialFocus?: HTMLElement | string
  returnFocus?: HTMLElement
  classNames?: {
    backdrop?: string
    container?: string
    content?: string
  }
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
}

export interface ModalEvents {
  beforeOpen?: () => void | Promise<void>
  afterOpen?: () => void
  beforeClose?: () => void | Promise<void>
  afterClose?: () => void
}

export interface ModalState {
  isOpen: boolean
  id: string
}

// Scroll Lock
class ScrollLock {
  private static lockCount = 0
  private static originalOverflow = ''
  private static originalPaddingRight = ''

  static lock(): void {
    if (this.lockCount === 0) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      this.originalOverflow = document.body.style.overflow
      this.originalPaddingRight = document.body.style.paddingRight
      document.body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    }
    this.lockCount++
  }

  static unlock(): void {
    this.lockCount = Math.max(0, this.lockCount - 1)
    if (this.lockCount === 0) {
      document.body.style.overflow = this.originalOverflow
      document.body.style.paddingRight = this.originalPaddingRight
    }
  }
}

// Focus Trap
const FOCUSABLE_SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
].join(',')

class FocusTrap {
  private container: HTMLElement
  private previousActiveElement: Element | null = null
  private handleKeyDown: (e: KeyboardEvent) => void

  constructor(container: HTMLElement) {
    this.container = container
    this.handleKeyDown = this.onKeyDown.bind(this)
  }

  private getFocusableElements(): HTMLElement[] {
    const elements = Array.from(
      this.container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    )
    return elements.filter((el) => {
      return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0
    })
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return

    const focusableElements = this.getFocusableElements()
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement.focus()
      return
    }

    if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement.focus()
      return
    }
  }

  activate(initialFocus?: HTMLElement | string): void {
    this.previousActiveElement = document.activeElement
    this.container.addEventListener('keydown', this.handleKeyDown)

    if (initialFocus) {
      const element =
        typeof initialFocus === 'string'
          ? this.container.querySelector<HTMLElement>(initialFocus)
          : initialFocus

      if (element) {
        element.focus()
        return
      }
    }

    const firstFocusable = this.getFocusableElements()[0]
    if (firstFocusable) {
      firstFocusable.focus()
    } else {
      this.container.setAttribute('tabindex', '-1')
      this.container.focus()
    }
  }

  deactivate(): void {
    this.container.removeEventListener('keydown', this.handleKeyDown)
    if (this.previousActiveElement && this.previousActiveElement instanceof HTMLElement) {
      this.previousActiveElement.focus()
    }
    this.previousActiveElement = null
  }
}

// A11y Helper
class A11yHelper {
  static setModalAttributes(
    container: HTMLElement,
    options: {
      ariaLabel?: string
      ariaLabelledBy?: string
      ariaDescribedBy?: string
    }
  ): void {
    container.setAttribute('role', 'dialog')
    container.setAttribute('aria-modal', 'true')

    if (options.ariaLabel) {
      container.setAttribute('aria-label', options.ariaLabel)
    }
    if (options.ariaLabelledBy) {
      container.setAttribute('aria-labelledby', options.ariaLabelledBy)
    }
    if (options.ariaDescribedBy) {
      container.setAttribute('aria-describedby', options.ariaDescribedBy)
    }
  }

  static generateId(prefix: string = 'modal'): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 11)}`
  }

  static hideFromScreenReaders(element: HTMLElement): void {
    element.setAttribute('aria-hidden', 'true')
  }
}

// Modal
export class Modal {
  private options: Required<ModalOptions>
  private events: ModalEvents
  private state: ModalState
  private focusTrap: FocusTrap | null = null

  private backdropElement: HTMLElement | null = null
  private containerElement: HTMLElement | null = null
  private contentElement: HTMLElement | null = null

  constructor(options: ModalOptions = {}, events: ModalEvents = {}) {
    this.options = {
      closeOnBackdropClick: true,
      closeOnEscape: true,
      lockScroll: true,
      trapFocus: true,
      classNames: {},
      ...options,
    } as Required<ModalOptions>
    this.events = events
    this.state = {
      isOpen: false,
      id: A11yHelper.generateId('modal'),
    }
  }

  private createElements(): void {
    this.backdropElement = document.createElement('div')
    this.backdropElement.className = this.options.classNames.backdrop || 'modal-backdrop'
    A11yHelper.hideFromScreenReaders(this.backdropElement)

    this.containerElement = document.createElement('div')
    this.containerElement.className = this.options.classNames.container || 'modal-container'
    this.containerElement.id = this.state.id

    A11yHelper.setModalAttributes(this.containerElement, {
      ariaLabel: this.options.ariaLabel,
      ariaLabelledBy: this.options.ariaLabelledBy,
      ariaDescribedBy: this.options.ariaDescribedBy,
    })

    this.contentElement = document.createElement('div')
    this.contentElement.className = this.options.classNames.content || 'modal-content'

    this.containerElement.appendChild(this.contentElement)
    document.body.appendChild(this.backdropElement)
    document.body.appendChild(this.containerElement)

    if (this.options.closeOnBackdropClick) {
      this.backdropElement.addEventListener('click', () => this.close())
    }

    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', this.handleEscapeKey)
    }
  }

  private handleEscapeKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.state.isOpen) {
      this.close()
    }
  }

  setContent(content: HTMLElement | string): void {
    if (!this.contentElement) {
      this.createElements()
    }

    if (this.contentElement) {
      if (typeof content === 'string') {
        this.contentElement.innerHTML = content
      } else {
        this.contentElement.innerHTML = ''
        this.contentElement.appendChild(content)
      }
    }
  }

  async open(): Promise<void> {
    if (this.state.isOpen) return

    if (this.events.beforeOpen) {
      await this.events.beforeOpen()
    }

    if (!this.containerElement) {
      this.createElements()
    }

    if (this.options.lockScroll) {
      ScrollLock.lock()
    }

    if (this.backdropElement && this.containerElement) {
      this.backdropElement.style.display = 'block'
      this.containerElement.style.display = 'block'
    }

    if (this.options.trapFocus && this.containerElement) {
      this.focusTrap = new FocusTrap(this.containerElement)
      this.focusTrap.activate(this.options.initialFocus)
    }

    this.state.isOpen = true

    if (this.events.afterOpen) {
      this.events.afterOpen()
    }
  }

  async close(): Promise<void> {
    if (!this.state.isOpen) return

    if (this.events.beforeClose) {
      await this.events.beforeClose()
    }

    if (this.focusTrap) {
      this.focusTrap.deactivate()
      this.focusTrap = null
    }

    if (this.options.lockScroll) {
      ScrollLock.unlock()
    }

    if (this.backdropElement && this.containerElement) {
      this.backdropElement.style.display = 'none'
      this.containerElement.style.display = 'none'
    }

    this.state.isOpen = false

    if (this.events.afterClose) {
      this.events.afterClose()
    }
  }

  toggle(): Promise<void> {
    return this.state.isOpen ? this.close() : this.open()
  }

  destroy(): void {
    if (this.state.isOpen) {
      this.close()
    }

    document.removeEventListener('keydown', this.handleEscapeKey)

    if (this.backdropElement) {
      this.backdropElement.remove()
      this.backdropElement = null
    }

    if (this.containerElement) {
      this.containerElement.remove()
      this.containerElement = null
    }

    this.contentElement = null
    this.focusTrap = null
  }

  getState(): Readonly<ModalState> {
    return { ...this.state }
  }

  isOpen(): boolean {
    return this.state.isOpen
  }
}
