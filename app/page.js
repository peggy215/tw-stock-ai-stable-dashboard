'use client'
import { useState } from 'react'

export default function Page() {
  const [code, setCode] = useState('2330')

  // 嘗試兩個市場（避免抓不到）
  const tvSymbolTWSE = `TWSE:${code}`
  const tvSymbolTPEX = `TPEX:${code}`

  return (
    <main style={{ background: '#000', color: '#67e8f9', minHeight: '100vh', padding: 20 }}>

      <h1 style={{ fontSize: 32 }}>台股 AI 看板</h1>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="輸入股票代號 2330"
        style={{
          padding: 10,
          marginTop: 10,
          background: '#111',
          color: '#fff',
          border: '1px solid #0ea5e9',
          borderRadius: 8
        }}
      />

      <h2 style={{ marginTop: 20 }}>
        股票代號：{code}
      </h2>

      {/* ✅ 主圖（上市） */}
      <div style={{ marginTop: 20 }}>
        <iframe
          src={`https://s.tradingview.com/widgetembed/?symbol=${tvSymbolTWSE}&interval=D&theme=dark&style=1&locale=zh_TW`}
          width="100%"
          height="500"
        />
      </div>

      {/* 🔁 備用圖（上櫃） */}
      <div style={{ marginTop: 20 }}>
        <iframe
          src={`https://s.tradingview.com/widgetembed/?symbol=${tvSymbolTPEX}&interval=D&theme=dark&style=1&locale=zh_TW`}
          width="100%"
          height="300"
        />
      </div>

      {/* AI 區塊 */}
      <div style={{
        marginTop: 20,
        padding: 20,
        border: '1px solid #0ea5e9',
        borderRadius: 10
      }}>
        <h3>AI 分析（基礎版）</h3>
        <p>趨勢：觀察K線與均線</p>
        <p>策略：回檔布局 / 突破追蹤</p>
        <p>風險：跌破前低需留意</p>
      </div>

    </main>
  )
}
