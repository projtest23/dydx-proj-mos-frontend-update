'use client'
import { useState, useEffect } from 'react'
import './trade.css'
import Image from 'next/image'
import closeposition from '@/public/closeposition.png'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/navigation'
import uniswap from '@/public/uniswap.svg'
import inch1 from '@/public/1inch.svg'

export default function Trade() {

    const cookieStore = new Cookies();
    const access = cookieStore.get('access')
    const router = useRouter()

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
        uniswap: true,
        wallet: '102452',
        un_profit_perc:2}])

    const [loading,setLoading] = useState(true)
    const humanize = require('humanize-number')
    useEffect(() => {
        
        if (access==undefined){
            router.push('/login')
        }
        const fetchData = async () => {
            const cookieStore = new Cookies()
            const access = cookieStore.get('access')
            let jwt = ''
            if (access){
                
                jwt = 'Bearer '+ access
            }
            const response = await fetch("http://45.195.250.168/dydx/api/v1/positions/",{
                cache:'no-store',
                headers:{
                    'Authorization': jwt,
                    "Content-Type":"application/json"
                }})
            const data = await response.json()
            setTableData(data)
            setLoading(false)
        };

    // Fetch data initially
    fetchData()

    // Fetch data every 2 seconds
    const intervalId = setInterval(fetchData, 200);
    
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
    }, [access,router])
    return (
    <div>
    <iframe src="https://trade.dydx.exchange/trade/ETH-USD"  className='iframe'></iframe>

    {/* // wallet section */}

    <div className='wallet'>
        <div className={(tableData[0].uniswap===true)?'wallet-logo-uni':'wallet-logo-inch'}>{(tableData[0].uniswap===true)?<Image  width={20} height={20} src={uniswap} alt=''/>:<Image  width={22} height={22} src={inch1} alt=''/>}
        </div>
        <div className='wallet-address'>{tableData[0].wallet.slice(0,7)+'....'+tableData[0].wallet.slice(-4)}</div>
    </div>
    <div className='account'>
        <div className='data'>
            <p className='text'>Buying Power</p>
            <p className='accountnumber'>${tableData[0]?humanize(tableData[0].bying_power):'1023'}</p>
        </div >
        <div className='data'>
            <p className='text'>Equity</p>
            <p className='accountnumber'>${tableData[0]?humanize(tableData[0].equity):'1023'}</p>
        </div>
        <div className='data'>
            <p className='text'>Margin Usage</p>
            <p className='accountnumber'>{tableData[0]?humanize(tableData[0].margin_usage):'1023'}%</p>
        </div>
        <div className='data'>
            <p className='text'>Account Leverage</p>
            <p className='accountnumber'>{tableData[0]?humanize(tableData[0].account_leverage):'1023'}×</p></div>
    </div>
    
    {tableData[0].size?
    <div>
    <div className={tableData[tableData.length-1].long?'position-long':'position-short'}>
    <div className='positiondata'>
      <div className={tableData[tableData.length-1].long?'long-long':'long-short'}>
        <p className='longp'>{tableData[tableData.length-1].long?'long':'short'}</p>
        </div> 
        </div>
      <div className='equity'>
        <div className='equitycurr'>
            <p className='number'>{humanize(tableData[tableData.length-1].size)}</p>
            <div className='name'>
                <span className='name-text'>ETH</span>
            </div>
        </div>
        <div className='numberdollar'>
            <span className='numberdollarspan'>${humanize(tableData[tableData.length-1].size_dollar)}</span>
        </div>
    </div>
    </div>
    {/* // a70 */}
        <p className='seventy'>
            70
        </p>

    {/* // average section */}
    <div className='average'>
        <div className='open'>
            <p>Average Open</p>
            <p className='opennumber'>${humanize(tableData[tableData.length-1].average_open)}</p>
        </div>
        <div className='close'>
            <p>Average Close</p>
            <p className='closenumber'>-</p>
        </div>
        <div className='funding'>
            <p>Net Funding</p>
            <p className={tableData[tableData.length-1].realized_PL<0?'fundingnumbershort':'fundingnumberlong'}>{tableData[tableData.length-1].realized_PL<0?'-$'+(humanize(-tableData[tableData.length-1].realized_PL)):'$'+(humanize(tableData[tableData.length-1].realized_PL))}</p>
        </div>
        <Image width={550} height={100} src={closeposition} alt=''></Image>
        </div >
    
        {/* //  leverage section */}

    <div className='leverage-section'>
        <div className='leverage-liq'>
            <div>
                <p>Leverage</p>
                <p className='leverage-number'>{humanize(tableData[tableData.length-1].leverage)}×</p>
            </div>
            <div className='Liquidation-Price'>
                <p>Liquidation Price</p>
                <p className='Liquidation-Price-number'>${humanize(tableData[tableData.length-1].liq_price)}</p>
            </div>
        </div>
            <div className='unrealized-realized '>
            <div>
                <p>Unrealized P&L</p>
                <p className={tableData[tableData.length-1].unrealized_profit<0?'unrealized-numbershort':'unrealized-numberlong'}>
                {tableData[tableData.length-1].unrealized_profit<0?('-$'+(humanize(-tableData[tableData.length-1].unrealized_profit))+' ('+(humanize(-tableData[tableData.length-1].un_profit_perc))+'%)'):
                '$'+(humanize(tableData[tableData.length-1].unrealized_profit))+' ('+(humanize(tableData[tableData.length-1].un_profit_perc))+'%)'}</p>
            </div>
            <div className='realized'>
                <p>Realized P&L</p>
                <p className={tableData[tableData.length-1].realized_PL<0?'realized-numbershort':'realized-numberlong'}>{tableData[tableData.length-1].realized_PL<0?'-$'+(humanize(-tableData[tableData.length-1].realized_PL)):'$'+(humanize(tableData[tableData.length-1].realized_PL))}</p>
            </div>
        </div>
    </div>
    <div></div>
    </div>
    :<div>
        <p className='seventy-withoutposition'>
            70
        </p>
        </div>}

    </div>

    
   
    )
  }
