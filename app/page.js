'use client'
import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const containerRef = useRef(null)
  const [code, setCode] = useState('2330')

  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.async = true

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `TWSE:${code}`,   // ✅ 強制台股
      interval: 'D',
      timezone: 'Asia/Taipei',
      theme: 'dark',
      style: '1',
      locale: 'zh_TW',
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false
    })

    containerRef.current.appendChild(script)
  }, [code])

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

      <div style={{ height: '600px', marginTop: 20 }} ref={containerRef}></div>

      <div style={{
        marginTop: 20,
        padding: 20,
        border: '1px solid #0ea5e9',
        borderRadius: 10
      }}>
        <h3>AI 分析（下一步會升級）</h3>
        <p>趨勢：觀察均線排列</p>
        <p>策略：回檔布局 / 突破追蹤</p>
        <p>風險：跌破支撐需留意</p>
      </div>

    </main>
  )
}
