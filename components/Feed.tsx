//import Stories from "./Stories";

import { useSession } from "next-auth/react";
import Admin from "./Admin"
import MiniProfile from "./MiniProfile"
import Posts from "./Posts"

function Feed() {

     const {data: session } = useSession();
 
  return (
        <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl
        xl:grid-cols-3 xl:max-w-6xl max-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
            {/*section1 */}
                 <section className="col-span-2">
                   {/*stories */}
                    {/*Stories */}
                   {/*posts */}
                   <Posts />
                 </section>
               
                {/*section2 */}
               {session && (
                <section className="hidden xl:inline-grid md:col-span-1">
                <div className="fixed top-20">
                 {/*mini profile */}
                 <MiniProfile />
                 {/*suggetions */}
                 <Admin />
                </div>
                 
              </section>
               )}
            

              

        </main>
    )
}

export default Feed
