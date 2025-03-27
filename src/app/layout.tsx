import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ReduxProvider from './store/Provider'
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Toaster />
        <ReduxProvider>
          <Header />
          <main className="flex h-full flex-grow justify-center">
            {children}
          </main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
