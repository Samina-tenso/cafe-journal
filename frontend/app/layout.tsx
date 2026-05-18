import './globals.css'

export const metadata = {
  title: 'Cafe Journal',
  description: 'Log and discover cafes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
