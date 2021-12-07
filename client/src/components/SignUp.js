import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Checkbox,
} from "semantic-ui-react";
import { ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

export default function SignUp({ handleSignUp, handleLoginModal }) {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    location: "",
    //experience: "",
    username: "",
    email: "",
    password: "",
  });
  console.log(formState);

  const [addUser, { error, data }] = useMutation(ADD_USER);

  // handles change for input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid
      textAlign="center"
      style={{ height: "10vh", paddingTop: "200px" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="./images/favicon.ico" /> Sign Up
        </Header>
        <Form size="large" onSubmit={handleFormSubmit}>
          <Segment stacked>
            <Form.Field>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First Name"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                value={formState.username}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
            {/* <Form.Field label="Gardening Experience" control="select" onSelect={handleSelect}>
              <option value="newbie">Newbie</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </Form.Field>*/}
            <Form.Field> 
              <Form.Input
                fluid
                icon="location arrow"
                iconPosition="left"
                placeholder="Austin, TX"
                name="location"
                value={formState.location}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Re-type Password"
              type="password"
            />
            <Form.Field>
              <Checkbox label="I agree to the Terms and Conditions" />
            </Form.Field>

            <Button color="teal" fluid size="large" type="submit">
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a Member?{" "}
          <div
            onClick={() => {
              // alert('yumy');
              handleLoginModal();
              handleSignUp();
            }}
          >
            Login
          </div>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
