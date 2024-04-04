'use client'

import { useState, useEffect } from 'react'
import './positions.css'
import Image from 'next/image'
import EthereumIcon from '@/public/EthereumIcon.svg'
import Cookies from 'universal-cookie'
import './openposition.css'
import share from '@/public/shareicon.png'
import noposition from '@/public/noposition.png'

function Positions() {

  const [tableData, setTableData] = useState([{
    id: 3,
    user: 2,
    market: "ETH-USD",
    long: true,
    size: 1.0,
    leverage: 20.0,
    realized_PL: 0.24,
    average_open: 2000.0,
    created_date: "2023-12-17T13:03:48.726063Z",
    updated_date: "2023-12-17T13:03:48.726071Z",
    unrealized_profit: 235.4,
    liq_price: 0,
    oracle: 2235.4,
    bying_power: 2000000.0,
    equity: 101706.21,
    size_dollar: 2235.4,
    margin_usage: 0.3,
    balance: 100000.0,
    account_leverage: 15.0,
    un_profit_perc:2}])


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
            const response = await fetch("http://185.110.189.83/dydx/api/v1/positions/",{
              cache:'no-store',
              headers:{
                  'Authorization': jwt,
                  "Content-Type":"application/json"
              }})
            if (response.status==200){
              const data = await response.json()
              setTableData(data)
              setLoading(false)
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
    <div className={'portfolio'}>
 
      <div className={'share'}>
          <h2 className={'h2'}>Open Positions</h2>
          {tableData[0].size? 
          <button className={'buttonshare'}><Image width={55} height={55} src={share} alt=''/></button>
          :<div></div>}
      </div>
    </div>
      {tableData[0].size? 
      <div>
      <div className={'positionsheader'}>
        <div className={'market'}>
          <p>Market</p>
          <span className={'side'}>Side</span>
          </div>

        <div className={'Size'}>
          <p>Size</p>
          <span className={'leverage'}>Leverage</span>
          </div>

        <div className={'Unrealized'}>
          <p>Unrealized P&L</p>
          <span className={'Realized'}>Realized P&L</span>
          </div>

        <div className={'Liq'}>
          <p>Liq. Price</p>
          <span className={'Oracle'}>Oracle</span>
          </div>
      </div>
      


    
    <div>  
    {tableData.map((pos)=>(
    <div key={pos.id}>
    <div className={pos.long?'poslong':'posshort'}>
      <div className='positiondata'>
      <div className='logo'>
        <Image width={35} height={50} src={EthereumIcon} alt=''/>
        </div>
      <div className='market'>
        <p>{pos.market}</p>
        <span className={pos.long?'sidelong':'sideshort'}>{pos.long?'long':'short'}</span>
        </div> 

      <div className='size'>
        <p>{humanize(pos.size)}</p>
        <span className='leverage'>{humanize(pos.leverage)}×</span>
        </div>

      <div className={pos.unrealized_profit<0?'Unrealizedshort':'Unrealizedlong'}>
        <p>{pos.unrealized_profit<0?'-$'+(humanize(-pos.unrealized_profit)):'$'+humanize(pos.unrealized_profit)}</p>
        <span className={pos.realized_PL<0?'Realizedshort':'Realizedlong'}>{pos.realized_PL<0?'-$'+(humanize(-pos.realized_PL)):
        '$'+humanize(pos.realized_PL)}</span>
        </div>

      <div className='Liq'>
        <p>${humanize(pos.liq_price)}</p>
        <span className='Oracle'>${humanize(pos.oracle)}</span>
        </div>
    </div>
    </div>
  </div>
  ))}
  </div>
  </div>
  :<div style={{marginTop:'20px'}}><Image  width={800} height={80} src={noposition} alt=''/></div>}
  </div>
  )
}

export default Positions
  