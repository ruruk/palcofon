"use client"

import { Toaster } from "@/components/ui/toaster"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: "z-[200]",
        duration: 3000,
      }}
    />
  )
}

