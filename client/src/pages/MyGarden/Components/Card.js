import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Icon, List, Button } from "semantic-ui-react";
import { ContentContainer, ImageContainer, MainLayout, ListLayout, NameBox, WaterBox, IconBox } from "../StyledElements/CardElements";
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
        style={{ backgroundColor: "#EBDBAE", padding: "5px", width: "100%" }}
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
              <ListLayout>
                <NameBox>
                  <p>{plant.nickname}</p>
                </NameBox>
                <WaterBox>
                  <p>{status}</p>
                  <Typography variant="body1" color="4f5902">
                    Days watered this month: {plant.waterAdded}
                  </Typography>
                </WaterBox>
                <IconBox>
                  <p>Icon Box</p>
                </IconBox>
              </ListLayout>
              <MainLayout>
                {/* Rest of the code for MainLayout */}

                <ImageContainer>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    style={{
                      textAlign: "center",
                      fontFamily: "Fuzzy Bubbles, cursive",
                      color: "4f5902",
                    }}
                  >
                    {plant.nickname}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="200"
                    image="./images/money-tree.webp"
                    alt={plant.name}
                    style={{ backgroundColor: "#4f5902" }}
                  />
                </ImageContainer>
                <List>
                  <List.Item>
                    {" "}
                    <Typography variant="body1" color="4f5902">
                      Type: {plant.plantType}
                    </Typography>
                  </List.Item>
                  <List.Item>
                    {" "}
                    <Typography variant="body1" color="4f5902">
                      Birthday: {plant.createdAt}
                    </Typography>
                  </List.Item>
                  <List.Item>
                    {" "}
                    <Typography variant="body1" color="4f5902">
                      Size: {plant.plantSize}
                    </Typography>
                  </List.Item>
                  <List.Item>
                    {" "}
                    <Typography variant="body1" color="4f5902">
                      Days watered this month: {plant.waterAdded}
                    </Typography>
                  </List.Item>
                </List>

                <div style={{ textAlign: "center" }}>
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
                </div>
              </MainLayout>
            </ContentContainer>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default PlantCard;
