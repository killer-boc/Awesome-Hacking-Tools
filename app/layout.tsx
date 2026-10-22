import type { Metadata, Viewport } from "next"

export const metadata: Metadata = { title: "Awesome Hacking Tools — Execution Workspace", description: "A secure workspace for browsing and launching authorized security tools." }
export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1, themeColor: "#0b0d0e" }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html> }
