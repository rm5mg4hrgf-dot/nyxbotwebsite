import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NYX — Mafia Club | A cartoonish Discord Mafia bot',
  description: 'A cartoonish Mafia social-deduction game for Discord: secret roles, dramatic votes, and chaotic late-night strategy.',
  generator: 'v0.app',
  metadataBase: new URL('https://rm5mg4hrgf-dot.github.io/nyxbotwebsite'),
  openGraph: {
    title: 'NYX — The night has a mind of its own',
    description: 'Bring strategic Mafia matches to your Discord server.',
    type: 'website',
  },
  icons: { icon: '/nyxbotwebsite/icon.svg', apple: '/nyxbotwebsite/apple-icon.png' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'dark',
  themeColor: '#09080c',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
