import './globals.css'
import { QueryProvider } from '../providers/QueryProvider'

export const metadata = {
  title: 'Cafe Journal',
  description: 'Log and discover cafes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
