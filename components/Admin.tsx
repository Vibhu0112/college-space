import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import AdminS from "./AdminS";

function Admin() {

    const{data: session}= useSession();
    const[admin, setAdmin] = useState([]);

    /*useEffect(() => {
      const admin = [...Array(5)].map((_, i) =>(
          {
            ...faker.helpers.contextualCard(),
            id: i,
          }));
          setAdmin(admin);
    },[])
  */

    useEffect(
        () => 
      onSnapshot(
          query(collection(db, 'admin'), orderBy('timestamp', 'asc')),
           snapshot => {
          setAdmin(snapshot.docs);
      }),
         [db]);
    
    return (
        
    <div className="mt-4 ml-11">
    <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Admin List</h3>
        <button className="text-gray-600 font-semibold">See All</button>
    </div>
    {
        admin.map(admin => (
            <div key={admin.id} className="flex items-center justify-between mt-3">
              <img className="h-10 w-10 rounded-full border p-[2px]" 
              src={admin.data().profileImg} alt="" />

              <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-sm" >{admin.data().username}</h2>
                  <h3 className="text-xs text-gray-400 ">{admin.data().duty}</h3>
              </div>
              <button className="text-blue-600 text-xs font-bold">View</button>
            </div>
            
        ))
    }
</div>
    )
}

export default Admin
