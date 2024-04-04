'use client'

import { useState, useEffect } from 'react'
import EthereumIcon from '@/public/EthereumIcon.svg'
import './fundinghistorytitle.css'
import share from '@/public/shareicon.png'
import noposition from '@/public/noposition.png'

function HistoryFunding() {
  
  return (
    <div>
        {/* title section */}
        <div className={'positionsheader'}>
        <div className={'funding-titlemarket'}>
          <p>Market</p>
          <span className={'funding-titlefundingrate'}>Funding Rate</span>
          </div>

        <div>
          <p className={'funding-titleapayment'}>Payment</p>
          </div>


          <div>
          <p className={'funding-titleposition'}>Position</p>
          </div>
      </div>

    {/* all transfers section */}
    <div className='positiondata'>
      <div className='noposition'>
        <p>You have no past funding payments.</p>
        </div> 
    </div>
  </div>
  )
}

export default HistoryFunding
  