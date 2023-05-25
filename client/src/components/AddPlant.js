import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Modal
} from "semantic-ui-react";
import { ADD_PLANT } from "../utils/mutations";
import { useMutation } from "@apollo/client";

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
      <p>Although some may fit on a desktop or perhaps a shelf, these are perfect floor plants. Depending on the variety of plant you've chosen, they can grow to be anywhere from 3 to 7 feet tall.</p>
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

export default function AddPlantForm({handlePlantModal}) {
  const [plantState, setPlantState] = useState({
    name: "",
    nickname: "",
    plantType: "",
    plantSize: "",
    waterNeeded: 15,
  });  

  const [addPlant] = useMutation(ADD_PLANT);

  // handles change for input
  const handleChange = (event, dropdownName) => {
    console.log(event)
    console.log(dropdownName)
    if(typeof dropdownName !== "string"){
      const { name, value } = event.target;
      if(name !== "waterNeeded"){
        setPlantState({
          ...plantState,
          [name]: value,
        });
        return
      }
      setPlantState({
        ...plantState,
        [name]: Number(value),
      });
      return
    }
    //It's a dropdown Option and must be treated differently
    console.log("it's either plantType or PlantSize")
    const {innerText} = event.target
    console.log(innerText)
    setPlantState({
      ...plantState,
      [dropdownName]: innerText,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addPlant({
        variables: { ...plantState,
        waterNeeded: Number(plantState.waterNeeded) },
      });
      handlePlantModal()
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <Grid>
      <Grid.Column >
        <Header as="div" id='addPlantHead'>
          Add a plant 
          <Button style={{position: 'absolute', right: '5'}} color='red' onClick={handlePlantModal}>
          Cancel
        </Button>
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
              <Form.Dropdown
          placeholder='Select an option'
          fluid
          selection
          name="plantType"
          label='Plant type'
          options={[{
            key: "Indoor",
            text: 'Indoor', value: 'Indoor'
          }, {
            key: "Outdoor",
            text: 'Outdoor', value: 'Outdoor'
          }]}
          onChange={(e)=> handleChange(e, "plantType")}
        />
            </Form.Field>
            <Form.Field >
            <Form.Dropdown
          placeholder='Select an option'
          fluid
          selection
          name="plantSize"
          label='Plant Size'
          options={[{
            key: "S",
            text: 'S', value: 'S'
          }, {
            key: "M",
            text: 'M', value: 'M'
          },{
            key: "L",
            text: 'L', value: 'L'
          }]}
          onChange={(e)=> handleChange(e, "plantSize")}
        />
            <SizeChartModal />
            </Form.Field>
            <Form.Field> 
              <Form.Input
                fluid
               label='Enter, in digits, how many days per month your plant requires water. Every other day by default.'
                placeholder="How many days per month should you water it?"
                name="waterNeeded"
                value={plantState.waterNeeded}
                onChange={handleChange}
                onKeyPress={(event) => {
                  const keyCode = event.keyCode || event.which;
                  const keyValue = String.fromCharCode(keyCode);
                  // Check if the entered value is not a number
                  if (!/^\d$/.test(keyValue)) {
                    event.preventDefault();
                  }
                }}
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
