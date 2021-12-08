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
import { ADD_PLANT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

export default function AddPlantForm({ handlePlantModal, handleLoginModal }) {
  const [plantState, setPlantState] = useState({
    name: "",
    nickname: "",
    plantType: "",
    plantSize: "",
    waterNeeded: "",
  });
  console.log(plantState);


  const [addPlant, { error, data }] = useMutation(ADD_PLANT);


  // handles change for input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setPlantState({
      ...plantState,
      [name]: value,
    });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(plantState);

    try {
      const { data } = await addPlant({
        variables: { ...plantState },
      });

      // Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid
      textAlign="center"
      style={{ height: "10vh", paddingTop: "150px" }}
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
                name="name"
                value={plantState.name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
                name="nickname"
                value={plantState.nickname}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Indoor or Outdoor"
                name="plantType"
                value={plantState.plantType}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="S, M, or L"
              name="plantSize"
              value={plantState.plantSize}
            onChange={handleChange}
            />
            <Form.Field> 
              <Form.Input
                fluid
                icon="location arrow"
                iconPosition="left"
                placeholder="How many days per month should you water it?"
                name="waterNeeded"
                value={plantState.waterNeeded}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox label="I have a new member of the family!" />
            </Form.Field>

            <Button color="teal" fluid size="large" type="submit">
              Add Plant
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a Member?{" "}
          <div
            onClick={() => {
              handlePlantModal();
              handleLoginModal();
            }}
          >
            Login
          </div>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
