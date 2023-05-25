import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { ADD_PLANT } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";
import SizeChartModal from "./SizeChartModal";
import {
  ImageContainer,
  RecordSummary,
  SummaryContainer,
  RecommendationText,
  Image,
} from "../StyledElements/AddPlantElement";

export default function AddPlantForm({ closeForm, closeAndUpdate }) {
  const [addPlant, { error, data }] = useMutation(ADD_PLANT);
  const initialState = {
    name: "",
    nickname: "",
    plantType: "",
    plantSize: "",
    waterNeeded: 15,
    hasImage: false,
  };
  const [plantState, setPlantState] = useState(initialState);
  console.log(plantState)
  const [plantRecommendations, setPlantRecommendations] = useState(null);
  useEffect(() => {
    // Your function logic here
    if (plantRecommendations === null) {
      return; // Exit out of the useEffect hook
    }
    let neededWater = Math.floor(plantRecommendations?.minWater * 10);
    setPlantState((prevState) => ({
      ...prevState,
      name: plantRecommendations.plant_name,
      waterNeeded: neededWater || 15,
      hasImage: true,
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
      alert(error);
      // Handle the error
    }
  };
  console.log(plantRecommendations);

  const [sizeModalViewable, setSizeModalViewable] = useState(false);
  const onClose = () => setSizeModalViewable(false);
  const onOpen = () => setSizeModalViewable(true);
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
    //Prevent bug on dropdown whwere it takes tabs as arguement
    setPlantState({
      ...plantState,
      [dropdownName]: innerText.split("\n")[0],
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("DDING A PLANT");
      console.log(plantState);
      const { data } = await addPlant({
        variables: {
          ...plantState,
        },
      });
      console.log(data);
      handleSuccessfulAdd();
    } catch (e) {
      console.log(e);
    }
  };
  const handleSuccessfulAdd = () => {
    setPlantRecommendations(null);
    setPlantState(initialState);
    closeAndUpdate();
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

            {!plantRecommendations ? (
              <SummaryContainer style={{marginTop: "5%", flexDirection: "column"}}>
                  <RecommendationText>
                    New Feature!: Upload A Picture of Your Plant and Get Plant Details
                  </RecommendationText>
                  <br></br>
                <input
                  type="file"
                  onChange={(e) => handleUpload(e.target.files[0])}
                  />
                  </SummaryContainer>
            ) : (              <SummaryContainer>
                <ImageContainer>
                  <img
                    src={plantRecommendations.image}
                    alt={plantRecommendations.description}
                  />
                </ImageContainer>
                <RecordSummary>
                  <RecommendationText>
                    <strong>Plant Type: </strong>
                    {plantRecommendations.plant_name}
                  </RecommendationText>
                  <RecommendationText>
                    <strong>Plant Match Probability: </strong>
                    {plantRecommendations.probability}%
                  </RecommendationText>
                  <RecommendationText>
                    <strong>Plant Description: </strong>
                    {plantRecommendations.description}
                  </RecommendationText>
                  <a
                    href={plantRecommendations.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <RecommendationText style={{ color: "blue" }}>
                      Visit the Wiki for caretips!
                    </RecommendationText>
                  </a>
                  <br></br>
                  <RecommendationText>
                  <strong>Watering Guidelines: </strong>
                  {!plantRecommendations?.minWater ? (
                    
                      "Please visit the Wiki for guidance on water care"
                  ) : plantRecommendations.minWater === 1 ? (
                     " Your plant doesn't require too much water"
                  ) : plantRecommendations.minWater === 2 ? (
                     " Your water required a moderate to high amount of water"
                  ) : (
                      "Your plant needs a lot water and care, pick carefully!"
                  )}
                  </RecommendationText>
                </RecordSummary>
          </SummaryContainer>
            )}
          <Form
            size="large"
            onSubmit={handleFormSubmit}
            style={{ marginTop: "5%" }}
          >
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
