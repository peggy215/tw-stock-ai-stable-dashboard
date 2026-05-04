'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [code, setCode] = useState('2330')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (code.length < 4) return;

    async function fetchRealTime() {
      try {
        // 取得今天的日期字串 YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];
        
        // 💡 使用 TaiwanStockPriceTick 並加上今日日期
        const url = `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPriceTick&data_id=${code}&start_date=${today}`;
        
        const res = await fetch(url)
        const json = await res.json()

        console.log("API 回傳結果:", json) // 👈 打開瀏覽器 F12 檢查這裡

        if (json.data && json.data.length > 0) {
          const latest = json.data[json.data.length - 1]
          setData({
            price: latest.deal_price,
            time: latest.time,
            volume: latest.volume
          })
          setError(null)
        } else {
          // 如果沒資料，可能是 API 還沒更新當日數據
          setError("目前尚無即時數據，請檢查代號是否正確或稍後再試")
          setData(null)
        }
      } catch (e) {
        setError("連線失敗")
        console.error(e)
      }
    }

    const timer = setTimeout(fetchRealTime, 800)
    return () => clearTimeout(timer)
  }, [code])

  return (
    <main style={{ background: '#000', color: '#67e8f9', minHeight: '100vh', padding: 20 }}>
      <h1>台股即時監測 (修正版)</h1>
      
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="例如: 2330"
        style={{ padding: 10, background: '#111', color: '#fff', border: '1px solid #0ea5e9', marginBottom: 20 }}
      />

      {error && <p style={{ color: '#ff4d4d' }}>{error}</p>}

      {data ? (
        <div>
          <div style={{ fontSize: '1.2rem' }}>股票代號: {code}</div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ff4d4d' }}>
            ${data.price}
          </div>
          <div style={{ color: '#aaa' }}>最後更新時間: {data.time}</div>
          <div style={{ color: '#aaa' }}>當筆成交量: {data.volume}</div>
        </div>
      ) : (
        !error && <p>讀取中...</p>
      )}

      <div style={{ marginTop: 40, fontSize: '12px', color: '#444' }}>
        * 若持續無資料，請確認 FinMind API 是否達到每小時請求上限。
      </div>
    </main>
  )
}
