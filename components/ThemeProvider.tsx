'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { MotionConfig } from 'motion/react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      themes={['dark', 'light']}
    >
      {/* reducedMotion="user" makes every motion/react animation site-wide
          respect the OS "prefers-reduced-motion" setting automatically. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  )
}
