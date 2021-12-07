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
      <div id="prog-cont">
     <ProfileStatus/>
     </div>
     <div id='prog-cont-2'>
     <NumbofPlants/>
     </div> 
        </>
    )
}
