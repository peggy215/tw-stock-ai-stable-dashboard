'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [code, setCode] = useState('2330')
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchStock() {
      try {
        // 👉 使用台股公開 API（穩定）
        const res = await fetch(`https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPrice&data_id=${code}&start_date=2024-01-01`)
        const json = await res.json()

        if (json.data && json.data.length > 0) {
          const latest = json.data[json.data.length - 1]
          const prev = json.data[json.data.length - 2]

          const price = latest.close
          const prevClose = prev.close
          const change = ((price - prevClose) / prevClose * 100).toFixed(2)

          setData({
            name: code, // 先用代號（下一步會補名稱）
            price,
            change
          })
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchStock()
  }, [code])

  return (
    <main style={{ background: '#000', color: '#67e8f9', minHeight: '100vh', padding: 20 }}>

      <h1 style={{ fontSize: 32 }}>台股 AI 看板（穩定版）</h1>

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

      {data && (
        <>
          <h2 style={{ marginTop: 20 }}>
            {code} ｜ 股價：{data.price} ｜ 漲跌幅：{data.change}%
          </h2>

          {/* 簡單K線替代（先用數據） */}
          <div style={{
            marginTop: 20,
            padding: 20,
            border: '1px solid #0ea5e9',
            borderRadius: 10
          }}>
            <p>✔ 資料來源：台股歷史價格</p>
            <p>✔ 已穩定取得數據</p>
          </div>

          {/* AI 分析（基礎版） */}
          <div style={{
            marginTop: 20,
            padding: 20,
            border: '1px solid #0ea5e9',
            borderRadius: 10
          }}>
            <h3>AI 分析（初階）</h3>
            <p>趨勢：{data.change > 0 ? '偏多' : '偏空'}</p>
            <p>策略：{data.change > 0 ? '拉回找買點' : '反彈觀察'}</p>
          </div>
        </>
      )}

    </main>
  )
}
