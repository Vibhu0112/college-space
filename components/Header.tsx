import Image from "next/image"
import { 
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import {HomeIcon} from "@heroicons/react/solid"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {

   const {data: session} = useSession();
   const [open, setOpen] = useRecoilState(modalState);
   const router = useRouter();
   

    return (
        <div className="shadow-sm border-b bg-white sticky top-0 z-50">
          <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
          {/*left */}
           <div onClick={() => router.push('/')} className="relative hidden lg:inline-grid w-20 cursor-pointer ">
            {/* <Image 
               src="http://2.bp.blogspot.com/-4pBaE9sDqjg/UYNzlT_tL9I/AAAAAAAAZck/PhzqPJx3le8/s1600/Instragram+logo.png"
               layout="fill"
               objectFit="contain"
             /> */}
             <h1 className="font-bold italic text-blue-500 font-xl mt-2 ">CollegeSocialSpace</h1>
           </div>
          
          <div onClick={() => router.push('/')} className="relative w-20 lg:hidden flex-shrink-0 bg">
          <Image 
               src="https://css-tricks.com/wp-content/uploads/2018/05/css-art.jpg"
               layout="fill"
               objectFit="contain"
             />
          </div>
          {/*middle search input field */}
          <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
             {/*  <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                 <SearchIcon className="h-5 w-5 text-gray-500"/>
              </div>
              <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md " 
                     type="text" 
                     placeholder="Search"/>
                     */}
            </div>
          </div>
            
          {/*right */} 
          <div className="flex items-center justify-end space-x-4">
             <HomeIcon onClick={() => router.push('/')} className="navbtn"/>
               

              {session ? (
                <>
               <MenuIcon className=" group relative h-7 md:hidden cursor-pointer" />
                <div onClick={() => router.push('/messages')} className="relative navbtn">
                <PaperAirplaneIcon className="navbtn rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5
                bg-red-500 rounded-full flex items-center justify-center
                animate-pulse text-white">5</div>
                </div>
                
                <PlusCircleIcon onClick={() => setOpen(true)} 
                className="navbtn" />
                
                <HeartIcon className="navbtn" />
   
                <img 
                onClick={signOut}
                src={session.user.image} 
                alt="Profile Picture"
                className="h-10 rounded-full cursor-pointer"
                />
                </>
              ):(
                <button onClick={signIn}>Sign In</button>
              )}
            
             
          </div>
            

          </div>
        </div>
    )
}

export default Header
