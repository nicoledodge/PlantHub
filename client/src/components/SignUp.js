import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export default function SignUp({handleSignUp, handleLoginModal}) {
    return (
        <Grid textAlign='center' style={{ height: '10vh', paddingTop: '200px' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='./images/favicon.ico' /> Sign Up
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />
                        <Form.Field label='An HTML <select>' control='select'>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
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

