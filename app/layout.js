export const metadata = { title: '台股 AI 看板' }
export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body style={{margin:0}}>{children}</body>
    </html>
  )
}
