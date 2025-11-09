import { Modal as CoreModal } from '@patterns/modal/core'

interface ConfirmOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  className?: string
}

interface ConfirmResult {
  confirmed: boolean
}

export const modal = {
  confirm: (options: ConfirmOptions): Promise<ConfirmResult> => {
    return new Promise((resolve) => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      const handleClose = (confirmed: boolean) => {
        modalInstance.destroy()
        container.remove()
        resolve({ confirmed })
      }

      const content = document.createElement('div')
      content.className = options.className || 'modal-confirm'

      if (options.title) {
        const title = document.createElement('h2')
        title.textContent = options.title
        content.appendChild(title)
      }

      const message = document.createElement('p')
      message.textContent = options.message
      content.appendChild(message)

      const actions = document.createElement('div')
      actions.className = 'modal-actions'

      const cancelBtn = document.createElement('button')
      cancelBtn.textContent = options.cancelText || 'Cancel'
      cancelBtn.onclick = () => handleClose(false)
      actions.appendChild(cancelBtn)

      const confirmBtn = document.createElement('button')
      confirmBtn.textContent = options.confirmText || 'Confirm'
      confirmBtn.onclick = () => handleClose(true)
      actions.appendChild(confirmBtn)

      content.appendChild(actions)

      const modalInstance = new CoreModal(
        {
          closeOnBackdropClick: false,
          closeOnEscape: true,
        },
        {
          beforeClose: () => handleClose(false),
        }
      )

      modalInstance.setContent(content)
      modalInstance.open()
    })
  },

  alert: (message: string, title?: string): Promise<void> => {
    return new Promise((resolve) => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      const handleClose = () => {
        modalInstance.destroy()
        container.remove()
        resolve()
      }

      const content = document.createElement('div')
      content.className = 'modal-alert'

      if (title) {
        const titleEl = document.createElement('h2')
        titleEl.textContent = title
        content.appendChild(titleEl)
      }

      const messageEl = document.createElement('p')
      messageEl.textContent = message
      content.appendChild(messageEl)

      const okBtn = document.createElement('button')
      okBtn.textContent = 'OK'
      okBtn.onclick = handleClose
      content.appendChild(okBtn)

      const modalInstance = new CoreModal(
        {
          closeOnEscape: true,
        },
        {
          beforeClose: handleClose,
        }
      )

      modalInstance.setContent(content)
      modalInstance.open()
    })
  },
}
