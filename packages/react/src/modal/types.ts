import { ReactNode } from 'react'
import { ModalOptions } from '@patterns/modal/core'

export interface ModalProps extends Omit<ModalOptions, 'classNames'> {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  backdropClassName?: string
  containerClassName?: string
  contentClassName?: string
  onBeforeOpen?: () => void | Promise<void>
  onAfterOpen?: () => void
  onBeforeClose?: () => void | Promise<void>
  onAfterClose?: () => void
}

export interface UseModalReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}
