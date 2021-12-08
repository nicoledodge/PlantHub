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
  Modal
} from "semantic-ui-react";
import { ADD_PLANT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

function SizeChartModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button>Size Chart</Button>}
    >
      <Header>
        Size Chart
      </Header>
      <Modal.Content>
      <Grid columns='equal'>
    <Grid.Column>
      <h2>small</h2>
      <p>These plants are suitable for use on a desk or on a shelf. Depending on the variety of plant you acquire, they are normally 5 to 15 inches tall.</p>
    </Grid.Column>
    <Grid.Column>
      <h2>medium</h2>
      <p>Medium plants are larger than those seen on a desk or shelf. They are usually 1-2 feet tall and have a larger presence.</p>
    </Grid.Column>
    <Grid.Column>
      <h2>large</h2>
      <p>Although some may fit on a desktop or perhaps a shelf, these are perfect  floor plants. Depending on the variety of plant you've chosen, they can grow to be anywhere from 3 to 7 feet tall.</p>
    </Grid.Column>
  </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' inverted onClick={() => setOpen(false)}>
          Cool
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

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
    <Grid>
      <Grid.Column >
        <Header as="h2" textAlign="center" id='addPlantHead'>
          Add a plant 
        </Header>
        <Form size="large" onSubmit={handleFormSubmit}>
          <Segment stacked>
            <Form.Field>
              <Form.Input
                fluid
                label='Plant Name'
                placeholder="Sunflower"
                name="name"
                value={plantState.name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                label='Nickname'
                placeholder="Sunny"
                name="nickname"
                value={plantState.nickname}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                label='Plant type'
                placeholder="Indoor or Outdoor"
                name="plantType"
                value={plantState.plantType}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field >
            <Form.Input
              fluid
              label='Plant Size'
              placeholder="'S' for small, 'M' for medium, 'L' for large"
              name="plantSize"
              value={plantState.plantSize}
              onChange={handleChange}
            />
            <SizeChartModal />
            </Form.Field>
            <Form.Field> 
              <Form.Input
                fluid
               label='Water Needed'
                placeholder="How many days per month should you water it?"
                name="waterNeeded"
                value={plantState.waterNeeded}
                onChange={handleChange}
              />
            </Form.Field>
            <Button fluid size="large" type="submit">
              Add Plant
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
