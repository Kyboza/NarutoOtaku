'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:border-black group-[.toaster]:shadow-lg ' +
            'group-[.toaster]:bg-[#A5A5A5] group-[.toaster]:bg-opacity-[75%] ' +
            'group-[.toaster]:text-white', // Gör all text i toasten vit
          title: 'group-[.toast]:text-white', // Gör titeln vit
          description: 'group-[.toast]:text-white', // Gör beskrivningstexten vit
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-white group-[.toast]:border-black', // Vit text, svart border
          cancelButton:
            'group-[.toast]:bg-black group-[.toast]:text-white group-[.toast]:border-black', // Svart bakgrund och vit text för Cancel
          closeButton: 'group-[.toast]:text-white', // Gör close-knappen vit
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
