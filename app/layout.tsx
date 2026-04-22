import type { Metadata } from 'next'
import { Bebas_Neue, Space_Grotesk, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const ttNormsPro = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-tt-norms-pro',
})

export const metadata: Metadata = {
  title: 'Crypto News | Криптологи',
  description: 'Криптографийн шинэ мэдээ, судалгаа, шинжилгээ',
  manifest: '/manifest.json',
  icons: {
    icon: '/ciphernews_icon_dark.png',
    apple: '/ciphernews_icon_white.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CryptoNews',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mn">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/ciphernews_icon_white.png" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={`${bebas.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${ttNormsPro.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
