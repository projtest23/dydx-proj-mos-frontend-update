'use client'
import { useEffect } from 'react'
import Cookies from 'universal-cookie'


// interface Auth {
//   access:string
//   refresh : string
//   user : object
// }

function CheckLogin(){

    async function CheckCookies(){
        
        const cookieStore = new Cookies();
        const access = cookieStore.get('access')
        
        if (access){
        
        // const value: Auth = JSON.parse(auth?.value)
        const data = {token:access}
        const verify = await fetch("http://45.195.250.168/jwt/verify/",
            {
                cache:'no-store',
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            })
        if(verify.status!==200){
                cookieStore.remove('auth')
        }    
    }
    }
    useEffect(()=>{CheckCookies()})
return(
    <></>
)
}
export default CheckLogin
