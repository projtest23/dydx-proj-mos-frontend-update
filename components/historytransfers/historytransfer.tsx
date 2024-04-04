'use client'

import { useState, useEffect } from 'react'
import EthereumIcon from '@/public/EthereumIcon.svg'
import './transferhistory.css'
import './transferhistorytitle.css'
import share from '@/public/shareicon.png'
import noposition from '@/public/noposition.png'
import Cookies from 'universal-cookie'
import Link from 'next/link'

function HistoryTransfer() {
  const [notransfer,setNotransfer] = useState(true)
  const [tableData, setTableData] = useState([{
    id: 1,
    user: 1,
    time: "14w",
    action: "Slow Withdraw",
    status: "Confirmed",
    amount: 10.25,
    transaction: "adasdfasdfadsfadfadsfadfadf",
    transaction_link: "https://google.com",
    fee: "-",
    created_date: "2024-04-04T15:41:28.63",
    updated_date: "2024-04-04T15:41:28.63"}])


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
            const response = await fetch("http://45.195.250.168/dydx/api/v1/historytransfers/",{
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
        {/* title section */}
        <div className={'positionsheader'}>
        <div className={'titleaction'}>
          <p>Action</p>
          <span className={'titlestatus'}>Status</span>
          </div>

        <div>
          <p className={'titleamount'}>Amount</p>
          </div>


        <div className={'titleTransaction'}>
          <p>Transaction</p>
          <span className={'titlefee'}>Fee</span>
          </div>
        </div>
    {notransfer?
  <div className='positiondata'>
  <div className='noposition'>
    <p>You have no transfer history.</p>
    </div> 
</div>:
    <div>
    {tableData.map((pos)=>(
      <div key={pos.id} className='positiondata'>
      <div  className='w'>
        <p>{pos.time}</p>
        </div> 
      <div className='action'>
        <p>{pos.action}</p>
        <span className='status'>{pos.status}</span>
        </div> 

      <div>
        <p className='amount-transfer'>${humanize(pos.amount)}</p>
        </div>

      <div className='transaction'>
        <div className='transaction-address-icon'>
        <a target="_blank" href={pos.transaction_link} className='transaction-address'>{pos.transaction.slice(0,6)+'....'+pos.transaction.slice(-4)}</a>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.07692 4.5H4.38462C3.61991 4.5 3 5.11991 3 5.88462V12.1154C3 12.8801 3.61991 13.5 4.38462 13.5H10.6154C11.3801 13.5 12 12.8801 12 12.1154V11" stroke="#6f6e84" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
                </path><path d="M8 8.5L13 3.5M13 3.5H9M13 3.5V7.5" stroke="#6f6e84" stroke-width="1.25" stroke-linecap="round"></path></svg>
        </div>
        <span className='fee'>{pos.fee}</span>
        </div>
    </div>
  ))}</div>}
  
  <div className='transfer-content'>
    <p className='transfer-content-content'>
    Looking for a fiat deposit? Check your order status in your email or contact 
    </p>
    <a className='transfer-content-link' href='https://support.banxa.com/'>
    Banxa support
    </a>
    <svg className='transfer-content-svg' width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.07692 4.5H4.38462C3.61991 4.5 3 5.11991 3 5.88462V12.1154C3 12.8801 3.61991 13.5 4.38462 13.5H10.6154C11.3801 13.5 12 12.8801 12 12.1154V11" 
      stroke="#6f6e84" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 8.5L13 3.5M13 3.5H9M13 3.5V7.5" stroke="#6f6e84" stroke-width="1.25" stroke-linecap="round">
        </path></svg>
  </div>
  </div>
  )
}

export default HistoryTransfer
  
