import React from 'react'
import { Card, Icon, Progress, Grid, Image, Form, Button } from 'semantic-ui-react'
const ProfileStatus = () => <Progress percent={25} color='olive'  label='Level: Newbie' style={{width: '300px', display: 'flex', alignItems: 'center', }} />
const NumbofPlants = () => ( <Progress progress='value' color='brown' value={'10'} label='Number of Plants' style={{width: '300px', display: 'flex', alignItems: 'center', }}/>)

export default function Profile() {
     return (
        <>
        <div id='proCardCont'>
        <Grid>
    <Grid.Column width={4}>
    <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>username</Card.Header>
      <Card.Meta>
        <span className='date'>Date Joined</span>
      </Card.Meta>
      <Card.Description>
        Location
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
     
        <Icon name='tree' />
        10 Plants
      
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
