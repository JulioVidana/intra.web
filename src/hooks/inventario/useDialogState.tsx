"use client"

import { useState } from "react"

export function useDialogState<T>(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)
  const [currentItem, setCurrentItem] = useState<T | null>(null)

  const open = (item?: T) => {
    if (item) {
      setCurrentItem(item)
    }
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setCurrentItem(null)
  }

  return {
    isOpen,
    currentItem,
    open,
    close,
    setIsOpen,
  }
}

