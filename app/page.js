'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [code, setCode] = useState('2330')
  const [data, setData] = useState(null)

  useEffect(() => {
    if (code.length < 4) return;

    async function fetchRealTimePrice() {
      try {
        // 👉 改用 taiwan_stock_tick API (這才是盤中即時資料)
        const res = await fetch(
          `[https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockTick&data_id=$](https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockTick&data_id=$){code}`
        )
        const json = await res.json()

        if (json.data && json.data.length > 0) {
          // 拿最後一筆成交明細
          const latest = json.data[json.data.length - 1]
          
          setData({
            price: latest.deal_price, // 最新成交價
            volume: latest.volume,    // 該筆成交量
            time: latest.time         // 成交時間
          })
        }
      } catch (e) {
        console.error("即時行情抓取失敗", e)
      }
    }

    const timer = setTimeout(fetchRealTimePrice, 500)
    return () => clearTimeout(timer)
  }, [code])

  return (
    <main style={{ background: '#000', color: '#67e8f9', minHeight: '100vh', padding: 20 }}>
      <h1>台股即時監測</h1>
      
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ padding: 10, background: '#111', color: '#fff', border: '1px solid #0ea5e9' }}
      />

      {data ? (
        <div style={{ marginTop: 20 }}>
          <h2>代號：{code}</h2>
          <div style={{ fontSize: 40, color: '#ff4d4d' }}>
            ${data.price}
          </div>
          <p>成交時間：{data.time}</p>
          <p>單筆成交量：{data.volume}</p>
        </div>
      ) : (
        <p>輸入正確代號或等待開盤...</p>
      )}
    </main>
  )
}
