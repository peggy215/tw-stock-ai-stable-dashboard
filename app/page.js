'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [code, setCode] = useState('2330')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 💡 只有當代號長度為 4 碼或以上時才發送請求
    if (code.length < 4) return;

    async function fetchStock() {
      setLoading(true)
      try {
        // 1. 取得今天日期 (格式: YYYY-MM-DD)
        const today = new Date().toISOString().split('T')[0];
        
        // 2. 修改 API：將 start_date 設為今天，或往前推幾天確保有資料
        // 注意：如果是假日，今天可能沒資料，所以通常會抓最近 3 天
        const res = await fetch(
          `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPrice&data_id=${code}&start_date=2024-05-01` 
        )
        const json = await res.json()

        if (json.data && json.data.length > 0) {
          // 拿最後一筆資料（即為最新成交價）
          const latest = json.data[json.data.length - 1]
          const prev = json.data.length > 1 ? json.data[json.data.length - 2] : latest

          setData({
            price: latest.close,
            open: latest.open,
            high: latest.max,
            low: latest.min,
            change: (((latest.close - prev.close) / prev.close) * 100).toFixed(2),
            date: latest.date
          })
        }
      } catch (e) {
        console.error("抓取失敗:", e)
      } finally {
        setLoading(false)
      }
    }

    // 設定 500ms 的防抖，避免連續輸入造成的 API 浪費
    const timer = setTimeout(fetchStock, 500)
    return () => clearTimeout(timer)
  }, [code])

  return (
    <main style={{ background: '#000', color: '#67e8f9', minHeight: '100vh', padding: 20 }}>
      <h1 style={{ fontSize: 32 }}>台股即時看板</h1>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="輸入股票代號（如：2330）"
        style={{
          padding: '12px 20px',
          fontSize: '18px',
          background: '#111',
          color: '#fff',
          border: '1px solid #0ea5e9',
          borderRadius: 8,
          width: '100%',
          maxWidth: '300px'
        }}
      />

      {loading && <p>讀取中...</p>}

      {data && !loading && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {code} 最新成交價：
            <span style={{ color: data.change >= 0 ? '#ff4d4d' : '#00ff00', marginLeft: 10 }}>
              {data.price} ({data.change}%)
            </span>
          </div>
          
          <div style={{ color: '#aaa', fontSize: '14px', marginTop: 5 }}>
            最後更新時間：{data.date}
          </div>

          <div style={{
            marginTop: 20,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            padding: 20,
            border: '1px solid #333',
            borderRadius: 10
          }}>
            <div>開盤：{data.open}</div>
            <div>最高：{data.high}</div>
            <div>最低：{data.low}</div>
            <div>趨勢：{data.change > 0 ? '🚀 偏多' : '📉 偏空'}</div>
          </div>
        </div>
      )}
    </main>
  )
}
