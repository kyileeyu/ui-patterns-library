import { useState, useCallback } from 'react'
import type { UseModalReturn } from './types'

export function useModal(initialOpen = false): UseModalReturn {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev: boolean) => !prev), [])

  return { isOpen, open, close, toggle }
}
