import {auth, provide} from "../Firebase-config"
import {signInWithPopup} from "firebase/auth"
import Cookies from "universal-cookie"


const Auth = ({setIsAuth}) => {
    const cookies = new Cookies()
          
    console.log("auth", auth);
    

    const signInWithGoogle = async() => {
        try {
            const result = await signInWithPopup(auth, provide)
        // console.log("result", result);
        cookies.set("auth-token", result.user.refreshToken) 
        setIsAuth(true)
        } catch (err) {
            console.error(err)
        }
    }
  return (
    <div className='w-full min-h-screen flex justify-center items-center gap-2'>
        <p>Sign in with google to continue</p>
        <button onClick={signInWithGoogle} className='px-3 py-2 border rounded-md'>Sign in with google</button>

    </div>
  )
}

export default Auth