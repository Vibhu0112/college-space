import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Snapshot } from "recoil";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import Post from "./Post"


function Posts() {

    const{data: session}= useSession();
    const [posts, setPosts] = useState([]);

    useEffect(
        () => 
      onSnapshot(
          query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
           snapshot => {
          setPosts(snapshot.docs);
      }),
         [db]);


    return (
        <div>
            {posts.map(post => (
            <Post key={post.id}
            id={post.id} 
            username={post.data().username}
            userImg={post.data().profileImg}
            img={post.data().image}
            caption={post.data().caption}
            />
            ))}
            
        </div>
    )
}

export default Posts
