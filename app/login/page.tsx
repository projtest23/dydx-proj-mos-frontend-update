import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function Login(){
    
    // const auth = cookies().get('access')
    // if (auth){
    //     redirect('/')
    // }
    async function login(e:FormData){
        
        "use server"

        const username = e.get('username')
        const password = e.get('password')
        const data = {username,password}
        // try{
        const token = await fetch("http://45.195.250.168/jwt/create/",    
        
        {
            cache:'no-store',
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
            if (token.status==200){
                const resp =  await token.json()
                cookies().set('access',JSON.stringify(resp.access))
                redirect('/')
            }
        // }catch{
        //     throw new Error('sorry service is down')
        // }
    }

    

    return (
        <div style={{display:'flex',flexDirection:'column',marginTop:'100px'}}>
            <form style={{color:'white',display:'flex',flexDirection:'column',width:'300px',margin:'auto'}} action={login}>
                <input  style={{margin:'20px' , color:'black',height:'30px'}} name = "username" type="text" autoComplete="true" placeholder="username"></input>
                <input style={{margin:'20px' , color:'black',height:'30px'}} name = "password" autoComplete="true" type="password" placeholder="password"></input>
                <button style={{backgroundColor:'blueviolet', color:'black',height:'30px'}} type="submit">login</button>
            </form>
        </div>
    )
}

export default Login
