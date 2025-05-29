"use client"

import type React from "react"

import { Toaster as Sonner } from "sonner"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const toastVariants = cva(
  "group border-border data-[type=success]:!border-green-500 data-[type=error]:!border-red-500 data-[type=warning]:!border-yellow-500 data-[type=info]:!border-blue-500",
  {
    variants: {
      variant: {
        default: "",
        success:
          "data-[type=success]:!bg-green-50 data-[type=success]:!text-green-800 data-[type=success]:!border-green-500",
        error: "data-[type=error]:!bg-red-50 data-[type=error]:!text-red-800 data-[type=error]:!border-red-500",
        warning:
          "data-[type=warning]:!bg-yellow-50 data-[type=warning]:!text-yellow-800 data-[type=warning]:!border-yellow-500",
        info: "data-[type=info]:!bg-blue-50 data-[type=info]:!text-blue-800 data-[type=info]:!border-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface ToastProps extends React.ComponentPropsWithoutRef<typeof Sonner>, VariantProps<typeof toastVariants> {}

export function Toaster({ variant, className, ...props }: ToastProps) {
  return (
    <Sonner
      className={cn(toastVariants({ variant }), className)}
      toastOptions={{
        classNames: {
          toast: "group border-border",
          title: "text-foreground font-semibold",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
          success: "!bg-green-50 !text-green-800 !border-green-500",
          error: "!bg-red-50 !text-red-800 !border-red-500",
          warning: "!bg-yellow-50 !text-yellow-800 !border-yellow-500",
          info: "!bg-blue-50 !text-blue-800 !border-blue-500",
        },
      }}
      {...props}
    />
  )
}
