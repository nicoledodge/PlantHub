import React from "react";
import homeImage from "./assets/hangingpots.jpeg";
import '../App.css'

export default function Home() {
    return (
        <div>
<img className="homeimg" src={homeImage} alt={'hanging flower pots'} />
            {/*<img src="public/images/5-Indoor-Plant-Storage-Ideas-driftwood-plant-hanger.jpeg" alt="hanging flower pots"/>*/}
            {/*<h2>HOME PAGE</h2>*/}
        </div>
    )
}