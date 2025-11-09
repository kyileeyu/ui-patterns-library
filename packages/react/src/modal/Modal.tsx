import { useEffect, useRef } from 'react'
import { Modal as CoreModal, ModalOptions, ModalEvents } from '@patterns/modal/core'
import type { ModalProps } from './types'

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  backdropClassName,
  containerClassName,
  contentClassName,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  lockScroll = true,
  trapFocus = true,
  initialFocus,
  returnFocus,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  onBeforeOpen,
  onAfterOpen,
  onBeforeClose,
  onAfterClose,
}: ModalProps) {
  const modalRef = useRef<CoreModal | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const events: ModalEvents = {
      beforeOpen: onBeforeOpen,
      afterOpen: onAfterOpen,
      beforeClose: async () => {
        if (onBeforeClose) await onBeforeClose()
        onClose()
      },
      afterClose: onAfterClose,
    }

    const options: ModalOptions = {
      closeOnBackdropClick,
      closeOnEscape,
      lockScroll,
      trapFocus,
      initialFocus,
      returnFocus,
      classNames: {
        backdrop: backdropClassName,
        container: containerClassName,
        content: contentClassName,
      },
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
    }

    modalRef.current = new CoreModal(options, events)

    return () => {
      if (modalRef.current) {
        modalRef.current.destroy()
        modalRef.current = null
      }
    }
  }, [
    closeOnBackdropClick,
    closeOnEscape,
    lockScroll,
    trapFocus,
    backdropClassName,
    containerClassName,
    contentClassName,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
  ])

  useEffect(() => {
    if (!modalRef.current || !contentRef.current) return

    modalRef.current.setContent(contentRef.current)
  }, [children])

  useEffect(() => {
    if (!modalRef.current) return

    if (isOpen) {
      modalRef.current.open()
    } else {
      modalRef.current.close()
    }
  }, [isOpen])

  return (
    <div ref={contentRef} className={className}>
      {children}
    </div>
  )
}
