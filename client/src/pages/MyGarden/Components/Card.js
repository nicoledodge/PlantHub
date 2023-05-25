import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Icon, Button, Progress } from "semantic-ui-react";
import {
  ContentContainer,
  ImageContainer,
  MainLayout,
} from "../StyledElements/CardElements";
import { REMOVE_PLANT, ADD_WATER } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";
const PlantCard = ({ plant, user, triggerRefetch }) => {
  const [removePlant] = useMutation(REMOVE_PLANT);
  const [addWater] = useMutation(ADD_WATER);
  const [deleteMessage, setDeleteMessage] = useState("Delete Plant");
  const [waterMessage, setWaterMessage] = useState("Add Water");

  const handleDeletePlant = async (plantId) => {
      await removePlant({
        variables: { plantId },
      });
      await triggerRefetch();
  };

  const handleAddWater = async (plantId) => {
      await addWater({
        variables: { plantId },
      });
  };

  return (
    <>
      <Card
        id="plant-card"
        style={{
          backgroundColor: "#EBDBAE",
          width: "100%",
          marginTop: "1.33%",
          height: "100%",
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
                  maxHeight: "100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  borderRadius: 10,
                }}
                image={plant.image || "./images/money-tree.webp"}
                alt={`Picture of your beloved ${plant.nickname || plant.name}`}
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
                <strong>Days Watered This Month</strong>: {plant.waterAdded}/{plant.waterNeeded}
              </Typography>
              <Typography variant="body1" color="4f5902">
                <strong>Hydration Status: </strong>: {plant.status}
              </Typography>
              <Progress
                percent={plant.percentage}
                color={plant.status === `I'm thirsty!` ? "red" : "blue"}
                active
              >
                <Typography variant="body1" color="4f5902">
                  {plant.percentage}% watered
                </Typography>
              </Progress>
              <Button
                compact
                id={plant.name}
                icon
                labelPosition="right"
                primary
                size="small"
                onClick={async () => {
                  if (waterMessage === "Add Water") {
                    setWaterMessage("Confirm Add Watering");
                    return;
                  }
                  await handleAddWater(plant._id);
                }}
              >
                <Icon name="tint" />
                <Typography variant="subtitle" color="white">
                  {waterMessage}
                </Typography>{" "}
              </Button>
              <br></br>
              <Button
                icon
                compact
                labelPosition="left"
                secondary
                size="small"
                negative
                onClick={async () => {
                  if (deleteMessage === "Delete Plant") {
                    setDeleteMessage("Confirm Delete");
                    return;
                  }
                  await handleDeletePlant(plant._id);
                }}
              >
                <Icon name="remove circle" />
                <Typography variant="subtitle" color="white">
                  {deleteMessage}
                </Typography>
              </Button>
            </MainLayout>
          </ContentContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default PlantCard;
