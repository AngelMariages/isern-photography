import { Rajdhani } from 'next/font/google';
import "../styles/globals.css";

const rajdhani = Rajdhani({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${rajdhani.className}`}>
      <body>{children}</body>
    </html>
  )
}
