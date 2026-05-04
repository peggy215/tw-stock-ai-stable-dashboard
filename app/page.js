'use client'
import { useState } from 'react'

const stockMap = {
  '2330': '台積電',
  '3231': '緯創'
}

export default function Page() {
  const [code, setCode] = useState('2330')

  // 判斷市場（上市 or 上櫃）
  const market = code.startsWith('3') ? 'TPEX' : 'TWSE'

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
        {code} {stockMap[code] || '（查無名稱）'}
      </h2>

      {/* 🔥 TradingView 正確市場 */}
      <div style={{ marginTop: 20 }}>
        <iframe
          src={`https://s.tradingview.com/widgetembed/?symbol=${market}:${code}&interval=D&theme=dark&style=1&locale=zh_TW`}
          width="100%"
          height="500"
          frameBorder="0"
        />
      </div>

      {/* AI 區塊 */}
      <div style={{
        marginTop: 20,
        padding: 20,
        border: '1px solid #0ea5e9',
        borderRadius: 10
      }}>
        <h3>AI 分析</h3>
        <p>趨勢：觀察K線與均線</p>
        <p>策略：回檔布局 / 突破追蹤</p>
        <p>風險：跌破支撐需注意</p>
      </div>

    </main>
  )
}
