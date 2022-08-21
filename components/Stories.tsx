/*import faker from "faker";
import { useEffect, useState } from "react";
import Story from "./Story";

function Stories() {
    const [suggetions, setSuggetions]=useState([])

    useEffect(() => {
        const suggetions=[...Array(20)].map((_, i) => ({
           ...faker.helpers.contextualCard(),
           id:i,
        })
        );
        setSuggetions(suggetions);
    }, [])

    return (
        <div className="">
            {suggetions.map(profile =>{
                <Story key={profile.id} img={profile.avatar} username={profile.username}/>
            } )}
        </div>
    )
}

export default Stories
*/