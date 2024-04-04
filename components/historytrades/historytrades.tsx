'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import EthereumIcon from '@/public/EthereumIcon.svg'
import Cookies from 'universal-cookie'
import './tradehistory.css'
import './tradehistorytitle.css'
import share from '@/public/shareicon.png'
import noposition from '@/public/noposition.png'

function HistoryTrade() {
  const [notransfer,setNotransfer] = useState(true)
  const [tableData, setTableData] = useState([{
    id: 1,
    user: 1,
    time: "14w",
    market: "ETH-USD",
    long: false,
    amount: 654.0,
    price: 52.0,
    total: 523.0,
    fee: 52.0,
    tradetype: "Liquidated",
    liquidity: "Taker",
    created_date: "2024-04-04T13:48:38.907256Z",
    updated_date: "2024-04-04T13:48:38.907269Z"}])


const [loading,setLoading] = useState(true)
const humanize = require('humanize-number')
  useEffect(() => {

    const fetchData = async () => {
          const cookieStore = new Cookies()
          const access = cookieStore.get('access')
          let jwt = ''
          if (access){
              
              jwt = 'Bearer '+ access
          }
          try{
            const url = "http://localhost:8000/dydx/api/v1/historytrades/"
            const response = await fetch(url,{
              cache:'no-store',
              headers:{
                  'Authorization': jwt,
                  "Content-Type":"application/json"
              }})
            if (response.status==200){
              const data = await response.json()
              setTableData(data)
              setLoading(false)
              if (data.length >0){
                setNotransfer(false)
              }else{
                setNotransfer(true)
              }
              }
            }catch{
              throw new Error('sorry service is down')
            }
          
      }
// Fetch data initially
      fetchData()

// Fetch data every 2 seconds
      const intervalId = setInterval(fetchData, 2000);

// Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    
}, [])

  return (
    <div>
      <div className={'positionsheader'}>
        <div className={'titlemarket'}>
          <p>Market</p>
          <span className={'titleside'}>Side</span>
          </div>

        <div className={'titleamount-trade'}>
          <p>Amount</p>
          <span className={'titleprice'}>Price</span>
          </div>

        <div className={'titletotal'}>
          <p>Total</p>
          <span className={'titlefee'}>Fee</span>
          </div>

        <div className={'titleType'}>
          <p>Type</p>
          <span className={'titleliq'}>Liquidity</span>
          </div>
      </div>
      {notransfer?
<div className='positiondata'>
<div className='noposition'>
  <p>You have no trade history.</p>
  </div> 
</div>:
  <div>
      {tableData.map((pos)=>(
      <div key={pos.id} className='positiondata'>
        <div className='w'>
          <p>{pos.time}</p>
          </div> 
        <div className='market'>
          <p>{pos.market}</p>
          <span className={pos.long?'sidelong':'sideshort'}>{pos.long?"Long":"Sell"}</span>
          </div> 

        <div className='amounttrade'>
          <p>{pos.amount}</p>
          <span className='Price'>${pos.price}</span>
          </div>

        <div className={pos.tradetype=='Market'?'Total-market':'Total-liquidated'}>
          <p>${pos.total}</p>
          <span className="Fee">${pos.fee}</span>
          </div>

        <div className='type'>
          <p>{pos.tradetype}</p>
          <span className='liquidity'>{pos.liquidity}</span>
          </div>
    </div>
    ))}</div>}
  </div>
  )
}

export default HistoryTrade
  