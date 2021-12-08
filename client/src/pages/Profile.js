import React, {useEffect, useState} from 'react'
import { Card, Icon, Progress, Grid, Image, Form, Button } from 'semantic-ui-react'
import { useQuery} from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
const ProfileStatus = () => <Progress percent={25} color='olive'  label='Level: Newbie' style={{width: '300px', display: 'flex', alignItems: 'center', }} />
const NumbofPlants = () => ( <Progress progress='value' color='brown' value={'10'} label='Number of Plants' style={{width: '300px', display: 'flex', alignItems: 'center', }}/>)

export default function Profile() {
  const { loading, data } = useQuery(QUERY_USER);

  const [plantCount, setPlantCount] = useState(0);

  const [username, setUsername] = useState("");


  const plantData = data?.user.myPlants || [];

  const userData = data?.user || [];

  useEffect(() => {
    if (plantData) {
      // console.log(data.length)
      // console.log(plantData.length)
      console.log(plantData);
      console.log(userData.username);
      //console.log(parseInt(plantData[0].waterNeeded))
      // // document.plant = data
      // let newPercent = plantData.map((plant, i) => {
      //   let x = plant.waterAdded;
      //   let y = plant.waterNeeded;
      //   return (x / y) * 100;
      // });
      //     console.log(newPercent)
      // setPercent(newPercent);
      setPlantCount(plantData.length);
      setUsername(userData.username);
    }
  }, [userData, plantData]);


     return (
        <>
        <div id='proCardCont'>
        <Grid>
    <Grid.Column width={4}>
    <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{username}</Card.Header>
      <Card.Meta>
        <span className='date'>Date Joined: {userData.createdAt}</span>
      </Card.Meta>
      <Card.Description>
        Located in: {userData.location}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
     
        <Icon name='tree' />
        {plantCount} Plants
      
    </Card.Content>
  </Card>
    </Grid.Column>
    <Grid.Column width={9}>
    <Form>
    <Form.Input label='Bio' placeholder='Tell us some things about yourself!' />
  
    <Button>Save</Button>
  </Form>
    </Grid.Column>
    <Grid.Column width={3}>
    <ProfileStatus id='profileStatus'/>
    <NumbofPlants id='numOfPlants'/>

    </Grid.Column>
  </Grid>
  </div>
 
        </>
     )
 }
