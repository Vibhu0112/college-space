import {getProviders ,signIn as signIntoProviders} from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Header from "../../components/Header";
import { useAuth, login } from "../../firebase";


// run on browser 
function signIn({providers }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSignIn() {
        setLoading(true);
        try{
           await login(emailRef.current.value, passwordRef.current.value).then(res => res?._tokenResponse?.registered? router.push('/') : "") 
        } catch{
            alert("Id/password is incorrect")
        }
        setLoading(false);
    }


    return (
      <>
       
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-5 px-14 text-center" >
          <h1 className="p-5 font-bold italic text-3xl">College-Social-Space</h1>
       {/*   <img className="w-60" 
          src="http://2.bp.blogspot.com/-4pBaE9sDqjg/UYNzlT_tL9I/AAAAAAAAZck/PhzqPJx3le8/s1600/Instragram+logo.png" alt="" />  */}
      <p className="font-xs italic " >
          This is a "College-Space" web app </p>
    
          <div id="fields" >
      <input ref={emailRef} type="text" placeholder="Email" className="flex mt-5 mb-2 rounded-md"/>
      <input ref={passwordRef} type="password" placeholder="Password" className="flex mt-2 rounded-md" />
    </div>

    <button type="submit" className="p-1 mt-4 bg-blue-600 rounded-lg text-white" onClick={handleSignIn}>Sign In</button>
    <h2 className=" mt-5 mb-5">OR</h2>

     {/*Login with Google */}
      <div className="mt-30">
        {Object.values(providers).map((provider)=> (
          <div key={provider.name}>
              <button className="p-3 bg-blue-600 rounded-lg text-white"
               onClick={() => signIntoProviders(provider.id,{ callbackUrl: "/" })}
               >
                  Sign in with {provider.name}
              </button>

          </div>
        ))}   
      </div>
      
      </div>
      
      </>
    )
}

//does server side render
export async function getServerSideProps(){
    const providers = await getProviders();
    
    return {
        props: {
            providers
        }
    }
}

export default signIn;









