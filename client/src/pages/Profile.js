import React from "react";
import { Progress } from 'semantic-ui-react'

export default function Profile() {
    const ProfileStatus = () => <Progress percent={25} color='olive'  label='Level: Newbie' style={{width: '300px', display: 'flex', alignItems: 'center', }} />
    const NumbofPlants = () => ( <Progress progress='value' color='brown' value={15} label='Number of Plants' style={{width: '300px', display: 'flex', alignItems: 'center', }}/>)
    return (
        <>
        <div id="prof-icon-cont">
     <i class="far fa-user-circle fa-5x profile-icon">
         <br/>
         jayladenae
         </i>
     </div>
     <div id="profile-cont-2">
     <i class="fas fa-map-marker-alt pro-location fa-2x">  Austin, TX</i>
     <br/>
     <br/>
     <ProfileStatus/>
     <br/>
     <NumbofPlants/>
     </div>
     <div id="prfile-cont-3">
         <h3>
             Bio:
         </h3>
        <input type="text" id="pro-bio-input" />
     </div>
        </>
    )
}
