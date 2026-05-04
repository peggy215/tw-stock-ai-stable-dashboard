'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [code, setCode] = useState('2330')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('--')
  const [change, setChange] = useState('--')

  useEffect(() => {
    async function fetchStock() {
      try {
        const res = await fetch(`https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_${code}.tw`)
        const data = await res.json()
        const d = data.msgArray?.[0]

        if (d) {
          // 股票名稱
          setName(d.n)

          // 價格處理（沒成交用昨收）
          const priceNow = d.z === '-' ? d.y : d.z
          const prevClose = d.y

          setPrice(priceNow)

          // 漲跌幅計算
          if (priceNow !== '-' && prevClose !== '-') {
            const changePercent = ((priceNow - prevClose) / prevClose * 100).toFixed(2)
            setChange(changePercent + '%')
          }
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchStock()
    const interval = setInterval(fetchStock, 10000)
    return () => clearInterval(interval)
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

      <h2 style={{ marginTop: 20 }}>
        {code} {name} ｜ 股價：{price} ｜ 漲跌幅：{change}
      </h2>

      {/* K線圖 */}
      <div style={{ marginTop: 20 }}>
        <iframe
          src={`https://s.tradingview.com/widgetembed/?symbol=TWSE:${code}&interval=D&theme=dark&style=1&locale=zh_TW`}
          width="100%"
          height="500"
          frameBorder="0"
        />
      </div>

      {/* AI 分析（基礎版） */}
      <div style={{
        marginTop: 20,
        padding: 20,
        border: '1px solid #0ea5e9',
        borderRadius: 10
      }}>
        <h3>AI 分析</h3>
        <p>趨勢：觀察均線排列（K線圖）</p>
        <p>策略：回檔布局 / 突破追蹤</p>
        <p>風險：跌破前低需留意</p>
      </div>

    </main>
  )
}
