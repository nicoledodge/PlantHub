import React, { useEffect, useState } from "react";
// import {Card, Icon} from 'semantic-ui-react';
import { Progress, Button, Checkbox, Icon, Table, Segment, Card, Image, Container, Grid, Header, List } from 'semantic-ui-react'
import Time from 'react-time-format'; 
import {useQuery, useMutation} from '@apollo/client';
import {QUERY_USER} from '../utils/queries';
import { ADD_WATER } from "../utils/mutations";
// import Auth from '../utils/auth'


//possibly make every card dynamic
//also thinking about making mygarden a parent div so we can pass the cards through as components as well as the detailed view of each plant
export default  function MyGarden () {

    const {loading, data } = useQuery(QUERY_USER)

    const [addWater, { error }] = useMutation(ADD_WATER);

    const plantData = data?.user.myPlants || [];

    const userData = data?.user || [];

    // const [plantData, setPlantData] = useState(data?.user.myPlants|| [])
    
    // console.log(plantData)
    
    //console.log(loading? "loading" : plantData)

    const [percent, setPercent] = useState(0)
    const [plantCount, setPlantCount] = useState(0)
    const [username, setUsername] = useState('')
    // const [birthday, setBirthday] = useState('')

    const handleAddWater = async (plantId) => {
        // get token
        // const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        // if (!token) {
        //   return false;
        // }
    
        try {
          const { data } = await addWater({
            variables: { plantId },
          });
    
        } catch (err) {
          console.error(err);
        }
      };

    
    useEffect(() => {
        if (data) {
            // console.log(data.length)
            // console.log(plantData.length)
            console.log(plantData)
            console.log(userData.username)
            //console.log(parseInt(plantData[0].waterNeeded))
            // document.plant = data
            let newPercent= plantData.map((plant,i) => {          
                let x = plant.waterAdded;
                let y = plant.waterNeeded;
                return x/y*100;
               }    
                )
            //     console.log(newPercent)
                setPercent(newPercent)
                setPlantCount(plantData.length)
                setUsername(userData.username)
    
        }
    },[data,plantData,userData])

    return (

            <Container textAlign='center'>
                <Grid divided inverted stackable>
                    <Grid.Column width={16}>
                    <Table compact celled>
<Table.Header>
  <Table.Row>
    <Table.HeaderCell>Plant</Table.HeaderCell>
    <Table.HeaderCell>Nickname</Table.HeaderCell>
    <Table.HeaderCell>Add Water</Table.HeaderCell>
    <Table.HeaderCell>Plant Hydration</Table.HeaderCell>
    <Table.HeaderCell>Family Member Est.</Table.HeaderCell>
  </Table.Row>
</Table.Header>

<Table.Body>
    {plantData.map((plant,i) => (
        <Table.Row>
      <Table.Cell>{plant.name}</Table.Cell>
    <Table.Cell>{plant.name}</Table.Cell>
    <Table.Cell collapsing>
    <Checkbox toggle id={plant._id}/>
    </Table.Cell>
      <Table.Cell>  
          <Segment inverted color='light blue'  >
        <Progress percent={percent[i]}  color='blue' active>
         {percent[i]}% watered this week
         </Progress>
         </Segment>
  </Table.Cell>
    <Table.Cell>
        {plant.createdAt}
        </Table.Cell>
  </Table.Row>

))}
</Table.Body>

<Table.Footer fullWidth>
  <Table.Row>
    <Table.HeaderCell />
    <Table.HeaderCell colSpan='4'>
      <Button
        floated='right'
        icon
        labelPosition='left'
        primary
        size='small'
      >
        <Icon name='tint' /> Add Water
      </Button>
      <Button size='small'>Approve</Button>
      <Button disabled size='small'>
        Approve All
      </Button>
    </Table.HeaderCell>
  </Table.Row>
</Table.Footer>
</Table>

                    </Grid.Column>
                    <Grid.Column width={14}>
                        <Header inverted as='h4'>Hello {username}, welcome to your garden!</Header>
                        <List link inverted>
                            <List.Item as='a'>FAQs</List.Item>
                            <List.Item as='a'>Privacy</List.Item>
                            <List.Item as='a'>Careers</List.Item>
                            <List.Item as='a'>Help Center</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Media' />
                        <List link inverted>
                            <List.Item as='a'>Promotions</List.Item>
                            <List.Item as='a'>Ads</List.Item>
                            <List.Item as='a'>News Letter</List.Item>
                        </List>
                    </Grid.Column>
                </Grid>
            </Container>
//     <Card>
//     <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
//     <Card.Content>
//       <Card.Header>smh</Card.Header>
//       <Card.Meta>
//         <span className='date'>Joined in 2015</span>
//       </Card.Meta>
//       <Card.Description>
//         Matthew is a musician living in Nashville.
//       </Card.Description>
//     </Card.Content>
//     <Card.Content extra>
//       <a>
//         <Icon name='user' />
//         22 Friends
//       </a>
//     </Card.Content>
//   </Card>
    );
}