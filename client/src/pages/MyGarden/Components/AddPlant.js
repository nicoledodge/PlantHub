import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { ADD_PLANT } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";
import SizeChartModal from "./SizeChartModal";
import {
  ImageContainer,
  RecordSummary,
  SummaryContainer,
} from "../StyledElements/AddPlantElement";

export default function AddPlantForm({ closeForm, closeAndUpdate }) {
  const [plantState, setPlantState] = useState({
    name: "",
    nickname: "",
    plantType: "",
    plantSize: "",
    waterNeeded: 15,
  });
  const [plantRecommendations, setPlantRecommendations] = useState(null);

  useEffect(() => {
    // Your function logic here
    if (plantRecommendations === null) {
      return; // Exit out of the useEffect hook
    }
    console.log("plant recommendations are here!")
    console.log(plantRecommendations)
    console.log(plantRecommendations.minWater)
    let neededWater = Math.floor(plantRecommendations.minWater * 2.5)*10;
    console.log(neededWater)
    setPlantState((prevState) => ({
      ...prevState,
      name: plantRecommendations.plant_name,
      waterNeeded: neededWater,
    }));
  }, [plantRecommendations]); // Specify the dependency as [value]

  
  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPlantRecommendations({
          plant_name: data.suggestions[0].plant_details?.scientific_name,
          minWater: data.suggestions[0].plant_details.watering?.max,
          maxWater: data.suggestions[0].plant_details.watering?.min,
          probability: (data.suggestions[0].probability * 100).toFixed(2),
          description:
            data.suggestions[0].plant_details.wiki_description?.value.split(
              "."
            )[0],
          link: data.suggestions[0].plant_details?.url,
          image: data.suggestions[0].plant_details.wiki_image?.value,
        });
        

        // Handle the response or perform additional actions
      } else {
        alert("Error uploading file:", response.statusText);
        // Handle the error
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(error)
      // Handle the error
    }
  };
  console.log(plantRecommendations);

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

          <SummaryContainer>
            {!plantRecommendations ? (
              <>
                <input
                  type="file"
                  onChange={(e) => handleUpload(e.target.files[0])}
                />
              </>
            ) : (
              <>
                <ImageContainer>
                  <p>{plantRecommendations.plant_name}</p>
                  <img
                    src={plantRecommendations.image}
                    alt={plantRecommendations.description}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: '8'
                    }}
                  />
                </ImageContainer>
                <RecordSummary>
                  <p>
                    Probability of match: {plantRecommendations.probability}%
                  </p>
                  <p>
                    {plantRecommendations.description}{" "}
                    {plantRecommendations.probability}%
                  </p>
                  <p>{plantRecommendations.link}</p>
                  {!plantRecommendations?.minWater ? <p>Please visit the Wiki for guidance on water care</p> : plantRecommendations.minWater === 1 ? <p>Your plant doesn't require too much water</p> : plantRecommendations.minWater === 2? <p>Your water required a moderate to high amount of water</p> : <p>Your plant needs a lot water and care, pick carefully!</p>}
                </RecordSummary>
              </>
            )}
          </SummaryContainer>
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
                <SizeChartModal
                  open={sizeModalViewable}
                  onOpen={onOpen}
                  onClose={onClose}
                />
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
