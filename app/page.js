'use client'
import { useState } from 'react'

const db = {
  '2330': { name:'台積電', price:'968', change:'+1.8%', support:'940', pressure:'990', summary:'AI需求帶動，趨勢偏多。' },
  '3231': { name:'緯創', price:'118', change:'+2.1%', support:'112', pressure:'123', summary:'AI伺服器題材，量價偏強。' }
}

export default function Page(){
 const [code,setCode]=useState('2330')
 const d = db[code] || { name:'查無資料', price:'--', change:'--', support:'--', pressure:'--', summary:'請輸入代號' }

 const card={background:'#08111f',border:'1px solid #0ea5e9',borderRadius:16,padding:16}
 return (
  <main style={{background:'#000',color:'#67e8f9',minHeight:'100vh',padding:30,fontFamily:'Arial'}}>
   <h1 style={{fontSize:40,marginTop:0}}>台股 AI 看板</h1>
   <p>100% 穩定部署版</p>
   <input value={code} onChange={e=>setCode(e.target.value)} placeholder="輸入代號 2330"
    style={{padding:12,borderRadius:10,border:'1px solid #0ea5e9',background:'#111',color:'#fff'}} />
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12,marginTop:20}}>
    <div style={card}><b>{code} {d.name}</b></div>
    <div style={card}>股價<br/>{d.price}</div>
    <div style={card}>漲跌幅<br/>{d.change}</div>
    <div style={card}>支撐 / 壓力<br/>{d.support} / {d.pressure}</div>
   </div>
   <div style={{...card,marginTop:20}}>
    <b>AI 分析</b><br/>{d.summary}
   </div>
  </main>
 )
}
