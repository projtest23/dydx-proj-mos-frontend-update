"use client"
import styles from '../styles.module.css'
import HistoryTrade from '@/components/historytrades/historytrades'
import HistoryTransfer from '@/components/historytransfers/historytransfer'
import HistoryFunding from '@/components/historyfundings/historyfunding'
import Image from 'next/image'
import './historysec.css'
import footer2 from '@/public/footer2.png'
import Cookies from 'universal-cookie'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {

//   const access = cookies().get('access')
    
//   if (access==undefined){
//     redirect('/login')
//   }
  const [titleActive, settitleActive] = useState("1")

  const handleClick = (e) =>{
    const active = e.target.id
    settitleActive(active)
  }
  
  return (
    <div>
        <div className={'portfolio'}>
 
 <div className={'share'}>
     <div id = "1" className={titleActive=="1"?'h2-active':"h2"} onClick={e=>handleClick(e)}>Trades</div>
     <h2 id = "2" className={titleActive=="2"?'h2-active':"h2"} onClick={e=>handleClick(e)}>Transfers</h2>
     <h2 id = "3" className={titleActive=="3"?'h2-active':"h2"} onClick={e=>handleClick(e)}>Funding</h2>
 </div>
</div>
    {titleActive=="1"?
    <div>
        <HistoryTrade/>
    </div>:titleActive=="2"?
    <div><HistoryTransfer/></div>:
    <div>
        <HistoryFunding/>
    </div>}  
      
      {/* <div className={styles.footer}><Link href="https://ck587cc5qvfd.statuspage.io/embed/frame"><Image layout='fill' objectFit='contain' src={footer2} alt=''/></Link></div>
       */}
       <div className="footer">
        <div className='hamberger'>
        <svg width="25" height="20" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 1H20.5M1.5 8H20.5M1.5 15H20.5" stroke="#c3c2d4" stroke-width="2" stroke-linecap="round"></path></svg>
        </div>
        <div className='zanguleh'>
        <svg  width="25" height="25" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mobile-bell" fill="white">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 15.5C9.10457 15.5 10 14.6046 10 13.5H6C6 14.6046 6.89543 15.5 8 15.5Z"></path></mask>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 15.5C9.10457 15.5 10 14.6046 10 13.5H6C6 14.6046 6.89543 15.5 8 15.5Z" fill="#6f6e84">
            </path><path d="M10 13.5H11V12.5H10V13.5ZM6 13.5V12.5H5V13.5H6ZM9 13.5C9 14.0523 8.55228 14.5 8 14.5V16.5C9.65685 16.5 11 15.1569 11 13.5H9ZM10 12.5H6V14.5H10V12.5ZM8 14.5C7.44772 14.5 7 14.0523 7 13.5H5C5 15.1569 6.34315 16.5 8 16.5V14.5Z" fill="#6f6e84" mask="url(#mobile-bell)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.53082 2H7.46918C5.97623 2 4.71047 3.09779 4.49933 4.57573L4.02203 7.91687C3.97979 8.21252 3.87189 8.49495 3.70623 8.74343L1.86852 11.5H14.1315L12.2938 8.74343C12.1281 8.49495 12.0202 8.21252 11.978 7.91687L11.5007 4.57574C11.2895 3.09779 10.0238 2 8.53082 2ZM7.46918 1C5.47858 1 3.7909 2.46372 3.50939 4.43431L3.03208 7.77545C3.01096 7.92327 2.95701 8.06449 2.87418 8.18873L1.03647 10.9453C0.593431 11.6099 1.06982 12.5 1.86852 12.5H14.1315C14.9302 12.5 15.4066 11.6099 14.9635 10.9453L13.1258 8.18873C13.043 8.06449 12.989 7.92327 12.9679 7.77545L12.4906 4.43431C12.2091 2.46372 10.5214 1 8.53082 1H7.46918Z" fill="#6f6e84">
              </path></svg>
        </div>
        <div className='transfer-deposit-button'>
          <div className='transfer-deposit-button-content'>
        <svg className='transfer-deposit-button-content-svg' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.96222 1L7.96225 9M7.96225 9L4.21417 5.55905M7.96225 9L11.7103 5.55905" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"></path><path d="M14 11V14H2V11" stroke="currentColor" stroke-width="1.15" stroke-linecap="round"></path></svg>
        
        <div className='transfer-deposit-button-content-text'>Export</div>
        </div>
        </div>
       </div>
    </div>
  )
}
