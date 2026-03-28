import type { Metadata } from 'next'

import '@/styles/globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'LZR App',
  description: 'Aplicação LZR Technologies',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
