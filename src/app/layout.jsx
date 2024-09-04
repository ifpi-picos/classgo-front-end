import { DM_Sans } from "next/font/google"
import "tailwindcss/tailwind.css"

const dmSans = DM_Sans({subsets: ["latin"]})

export const metadata = {
  title: "Class Go",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={dmSans.className}>{children}</body>
    </html>
  )
}
