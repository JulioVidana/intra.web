"use client"

import type React from "react"

import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BaseModalProps {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children?: React.ReactNode
  className?: string
  showCloseButton?: boolean
  footer?: React.ReactNode
}

export default function BaseModal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  showCloseButton = true,
  footer,
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "max-w-2xl rounded-lg border shadow-lg",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
           "[&>button.absolute]:hidden",
          className,
        )}
        onEscapeKeyDown={(event) => {
          event.preventDefault()
          onClose()
        }}
        onPointerDownOutside={(event) => {
          event.preventDefault()
          onClose()
        }}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            {description && (
              <DialogDescription className="mt-1.5 text-muted-foreground">{description}</DialogDescription>
            )}
          </div>
          {showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 rounded-full opacity-70 hover:opacity-100 transition-opacity"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </DialogHeader>

        <div className="py-2">{children}</div>

        {footer && <div className="mt-6 flex justify-end space-x-2 pt-4 border-t">{footer}</div>}
      </DialogContent>
    </Dialog>
  )
}
