import React from 'react'
import { Header, Icon, Grid, Segment, Button, Form } from 'semantic-ui-react'

const HeaderExampleUsersIcon = () => (
    <>
    <Header as='h2' icon textAlign='center'>
    <Header.Content style={{fontFamily:'Oswald, sans-serif', marginTop: '20px'}}>Contact Us</Header.Content>
  </Header>
  <div id="ContactContainer">
    <Grid stackable columns={2}>
    <Grid.Column>
      <Segment>
       <p id="ContactPar">We'd love to hear from you. If you have any questions, please fill out the contact form, and we will get back to you as soon as possible. </p>
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment>
      <Form>
    <Form.Field>
      <Form.Input icon='user' iconPosition='left'  placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <Form.Input icon='mail' iconPosition='left' placeholder='Email' />
    </Form.Field>
    <Form.Field>
     <Form.Input icon='mail outline' iconPosition='left' placeholder='Your Message'/>
    </Form.Field>
    <Button color='olive' type='submit'>Send</Button>
  </Form>
      </Segment>
    </Grid.Column>
  </Grid>
  </div>
  </>
)

export default HeaderExampleUsersIcon
