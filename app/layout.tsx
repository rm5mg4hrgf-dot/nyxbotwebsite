import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NYX — The night has a mind of its own',
  description: 'A strategic Discord Mafia experience for people who love the long night.',
  generator: 'v0.app',
  metadataBase: new URL('https://nyxbot.vercel.app'),
  openGraph: {
    title: 'NYX — The night has a mind of its own',
    description: 'Bring strategic Mafia matches to your Discord server.',
    type: 'website',
  },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
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
