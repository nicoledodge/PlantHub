import React, { useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { ADD_PLANT } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";
import SizeChartModal from "./SizeChartModal";

export default function AddPlantForm({ closeForm, closeAndUpdate }) {
  const [plantState, setPlantState] = useState({
    name: "",
    nickname: "",
    plantType: "",
    plantSize: "",
    waterNeeded: 15,
  });
  const [sizeModalViewable, setSizeModalViewable] = useState(false);
  const onClose = () => setSizeModalViewable(false);
  const onOpen = () => setSizeModalViewable(true);
  const [addPlant, { error, data }] = useMutation(ADD_PLANT);
  const handleChange = (event, dropdownName) => {
    if (typeof dropdownName !== "string") {
      const { name, value } = event.target;
      if (name !== "waterNeeded") {
        setPlantState({
          ...plantState,
          [name]: value,
        });
        return;
      }
      setPlantState({
        ...plantState,
        [name]: Number(value),
      });
      return;
    }
    const { innerText } = event.target;
    setPlantState({
      ...plantState,
      [dropdownName]: innerText,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addPlant({
        variables: {
          ...plantState,
        },
      });
      closeAndUpdate();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Grid>
        <Grid.Column>
          <Header as="div" id="addPlantHead">
            Add a plant
          </Header>
          <Button
            style={{ position: "fixed", top: "5px", right: "5px" }}
            color="red"
            onClick={closeForm}
          >
            Cancel
          </Button>
          <Form size="large" onSubmit={handleFormSubmit}>
            <Segment stacked>
              <Form.Field>
                <Form.Input
                  fluid
                  label="Plant Name"
                  placeholder="Sunflower"
                  name="name"
                  value={plantState.name}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  label="Nickname"
                  placeholder="Sunny"
                  name="nickname"
                  value={plantState.nickname}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Dropdown
                  placeholder="Select an option"
                  fluid
                  selection
                  name="plantType"
                  label="Plant type"
                  options={[
                    {
                      key: "Indoor",
                      text: "Indoor",
                      value: "Indoor",
                    },
                    {
                      key: "Outdoor",
                      text: "Outdoor",
                      value: "Outdoor",
                    },
                  ]}
                  onChange={(e) => handleChange(e, "plantType")}
                />
              </Form.Field>
              <Form.Field>
                <Form.Dropdown
                  placeholder="Select an option"
                  fluid
                  selection
                  name="plantSize"
                  label="Plant Size"
                  options={[
                    {
                      key: "S",
                      text: "S",
                      value: "S",
                    },
                    {
                      key: "M",
                      text: "M",
                      value: "M",
                    },
                    {
                      key: "L",
                      text: "L",
                      value: "L",
                    },
                  ]}
                  onChange={(e) => handleChange(e, "plantSize")}
                />
                <SizeChartModal  open={sizeModalViewable}
        onOpen={onOpen}
        onClose={onClose}/>
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  label="Enter, in digits, how many days per month your plant requires water. Every other day by default."
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
    </>
  );
}
