import {EmojiHappyIcon, HomeIcon} from "@heroicons/react/solid"
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState , useEffect} from "react";
import Moment from "react-moment";
import { db } from "../../firebase";


function MessagesHeader({id}) {

    const{data: session}= useSession();
    const router = useRouter();
    const [messages, setMessages] = useState([])
    const[message,setMessage] = useState("");
   /* useEffect(() => { 
        db.collection("messages").orderBy("createdAt").limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
          }  )
    }, [])*/

    useEffect(
        () => 
      onSnapshot(
          query(collection(db, "messages"), orderBy('timestamp', 'asc'),limit(50)),
           snapshot => {
          setMessages(snapshot.docs);
      }),
         [db]);
   


         const sendMessage = async (e) => {
            e.preventDefault();
    
            const messageToSend = message;
            setMessage('');
    
            await addDoc(collection(db,'messages'),{
                message: messageToSend,
                username: session.user.username,
                userImage: session.user.image,
                timestamp: serverTimestamp(),
            })
        }
    
    
  return <div>
              
              <div className="shadow-sm border-b bg-white sticky top-0 z-50">
              <div onClick={() => router.push('/')} className="lg:inline-grid w-20 cursor-pointer ">
             <h1 className="font-bold italic text-blue-500 font-xl mt-2 ">CollegeSocialSpace</h1>
           </div>
          

                   <HomeIcon onClick={() => router.push('/')} 
                   className=" cursor-pointer hover:scale-125
                     duration-150 ease-out h-10 w-10"/>
              </div>
            {/*
              {messages.map(messages => (
                  <div key={messages.id}>
                     <img src="" alt="" />
                     <h2>{messages.data().text}</h2>
                  </div>
              ))}
              <SendMessages />

              */}


{messages.length > 0 && (
     <div className="ml-10">
                    {messages.map((message) => (
                        <div key={message.id} className="flex items-center space-x-2 mb-3">
                            <img className="h-7 rounded-full" src={message.data().userImage} alt="" />
                            <p className="text-sm flex-1">
                                <span className="font-bold">
                                {message.data().username}
                                </span>
                                {" : "}
                                {message.data().message}
                                </p>
                                <Moment fromNow className="pr-5 text-xs">
                                    {message.data().timestamp?.toDate()}
                                </Moment>
                        </div>
                    ))}
                </div>
        
            )}

{session && (
                 <form className="flex items-center p-3 sticky bottom-0">
                 <input type="text" value={message} 
                 onChange={e => setMessage(e.target.value)}
                 placeholder="Type here..." className="border-none mb-1 flex-1 focus:ring-0 outline-none"/>
                 <button type="submit" 
                 onClick={sendMessage}
                 className="font-semibold text-blue-600 ">Send</button>
             </form>  
            )}
            
            </div>;
}

export default MessagesHeader;

