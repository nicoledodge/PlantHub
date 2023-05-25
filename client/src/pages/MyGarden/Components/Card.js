import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Icon, List, Button } from "semantic-ui-react";
import {
  ContentContainer,
  ImageContainer,
  MainLayout,
  ListLayout,
  NameBox,
  WaterBox,
  IconBox,
} from "../StyledElements/CardElements";
import { REMOVE_PLANT } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";
const PlantCard = ({ plant, user }) => {
  const [removePlant, { err }] = useMutation(REMOVE_PLANT);
  const handleDeletePlant = async (plantId) => {
    try {
      await removePlant({
        variables: { plantId },
      });
    } catch (err) {
      console.error(err);
    }
  };
  console.log(plant);
  const [status, setStatus] = useState("");
  useEffect(() => {
    let actualMonthlyWaterAdded = (plant.waterAdded / plant.waterNeeded) * 100;
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDayOfMonth = currentDate.getDate();
    let numberOfDaysInMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    let ontargetGoal = (currentDayOfMonth / numberOfDaysInMonth) * 100;
    // determine if done for the month
    if (
      actualMonthlyWaterAdded > ontargetGoal &&
      actualMonthlyWaterAdded === 100
    ) {
      setStatus("Your plant is all watered up for the month! :D");
      return;
    }
    //determine if on target
    if (actualMonthlyWaterAdded >= ontargetGoal) {
      setStatus("Your plant is hydrated!");
      return;
    }
    setStatus(`${user}, I'm thirsty!`);
  }, [plant]);


  return (
    <>
      <Card
        id="plant-card"
        style={{
          backgroundColor: "#EBDBAE",
          width: "100%",
          marginTop: "1.33%",
          height: "100%"
        }}
      >
        <CardActionArea
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent style={{ width: "100%" }}>
            <ContentContainer>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                style={{
                  textAlign: "center",
                  fontFamily: "Fuzzy Bubbles, cursive",
                  color: "4f5902",
                  marginVertical: 3,
                }}
              >
                {plant.nickname || plant.name}
              </Typography>
              <ImageContainer>
                <CardMedia
                  component="img"
                  style={{
                    width: "100%",
                    maxHeight: '100%',
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    borderRadius: 10,
                  }}
                  image={plant.image || "./images/money-tree.webp"}
                  alt={`Picture of your beloved ${
                    plant.nickname || plant.name
                  }`}
                />
              </ImageContainer>
              <MainLayout>
                  <Typography variant="body1" color="4f5902">
                  <strong>Type</strong>: {plant.plantType}
                  </Typography>
                  <Typography variant="body1" color="4f5902">
                    <strong>Birthday</strong>: {plant.createdAt.split("at")[0]}
                  </Typography>
                  <Typography variant="body1" color="4f5902">
                  <strong>Size</strong>: {plant.plantSize}
                  </Typography>
                  <Typography variant="body1" color="4f5902">
                  <strong>Days Watered This Month</strong>: {plant.waterAdded}
                  </Typography>
                <Button
                  className="removegardenbtn"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  style={{ backgroundColor: "#4f5902" }}
                  onClick={async () => await handleDeletePlant(plant._id)}
                >
                  <Icon name="remove circle" />
                  <Typography variant="body1" color="white">
                    Remove from Garden
                  </Typography>
                </Button>

              </MainLayout>
              
            </ContentContainer>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default PlantCard;
