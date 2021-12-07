import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Checkbox } from 'semantic-ui-react'

export default function SignUp({handleSignUp, handleLoginModal}) {
    return (
        <Grid textAlign='center' style={{ height: '10vh', paddingTop: '200px' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='./images/favicon.ico' /> Sign Up
                </Header>
                <Form size='large'>
                    <Segment stacked>
                    <Form.Field>
      
      <Form.Input fluid icon='user' iconPosition='left' placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      
    <Form.Input fluid icon='user' iconPosition='left' placeholder='Last Name' />
    </Form.Field>
                        <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' />
                    
                        <Form.Field label='Gardening Experience' control='select'>
        <option value='newbie'>Newbie</option>
        <option value='intermediate'>Intermediate</option>
        <option value='expert'>Expert</option>        
      </Form.Field>
      <Form.Field>
      <Form.Input fluid icon='location arrow' iconPosition='left'  placeholder='Austin, TX' />
    </Form.Field>

      <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Retype Passwork'
                            type='password'
                        />
                        <Form.Field>
                 <Checkbox label='I agree to the Terms and Conditions' />
                  </Form.Field>

                        <Button color='teal' fluid size='large'>
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already a Member? <div onClick={() => {
                    // alert('yumy');
                    handleLoginModal();
                    handleSignUp();
                }}>Login</div>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

