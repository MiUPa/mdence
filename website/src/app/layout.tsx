import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MDence — Confluence-Like Markdown Editor for VS Code',
  description: 'A block-based Markdown editor with a Confluence-like editing experience. Edit visually while keeping plain Markdown.',
  keywords: ['markdown', 'vscode', 'cursor', 'wysiwyg', 'confluence-like', 'block editor', 'markdown editor'],
  authors: [{ name: 'MiUPa' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'MDence — Confluence-Like Markdown Editor',
    description: 'A block-based Markdown editor for VS Code and Cursor with a Confluence-like editing experience.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MDence — Confluence-Like Markdown Editor',
    description: 'A block-based Markdown editor for VS Code and Cursor with a Confluence-like editing experience.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
