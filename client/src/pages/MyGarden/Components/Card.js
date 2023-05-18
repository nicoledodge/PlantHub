import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Icon, List, Button } from "semantic-ui-react";
const PlantCard = ({ plant }) => {
  const contentContainer = {
    display: "flex",
  };
  const imageContainer = {
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    width: "250px",
    backgroundColor: "blue",
    flexDirection: "column",
    "@media screen and (min-width: 800px)": {
      display: "flex",
    },
  };
  const mainLayout = {
    display: "none",
  };
  const listLayout = {
    display: "flex",
    width: "100%",
    "@media screen and (min-width: 800px)": {
      display: "none",
    },
  };
  const nameBox = {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const waterBox = {
    width: "55%",
    display: "flex",
    alignItems: "center",
  };
  const iconBox = {
    width: "15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const getPercent = (plant) => {
    const actualMonthlyWaterAdded =
      (plant.waterAdded / plant.waterNeeded) * 100;
    console.log(actualMonthlyWaterAdded);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDayOfMonth = currentDate.getDate();
    const numberOfDaysInMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    const ontargetGoal = (currentDayOfMonth / numberOfDaysInMonth) * 100;
    return actualMonthlyWaterAdded > ontargetGoal &&
      actualMonthlyWaterAdded === 100
      ? "I'm not thirsty, you're awesome!"
      : actualMonthlyWaterAdded > ontargetGoal
      ? "You're on track, your plant is feeling loved <3"
      : "I'm thirsty";
  };

  return (
    <>
      <Card id="plant-card">
        <CardActionArea>
          <CardContent style={contentContainer}>
          <div style={listLayout}>
              <div style={nameBox}>
                <h1>{plant.nickname}</h1>
              </div>
              <div style={waterBox}>
                <h1>{getPercent(plant)}</h1>
                <Typography variant="body1" color="4f5902">
                    Days watered this month: {plant.waterAdded}
                  </Typography>
              </div>
              <div style={iconBox}>
                <h1>Icon Box</h1>
              </div>
            </div>
            <div style={mainLayout}>
              <div style={imageContainer}>
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
              </div>
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
                  // onClick={async () => {
                  //   await handleDeletePlant(plant._id);
                  //   await refetch();
                  // }}
                >
                  <Icon name="remove circle" />
                  <Typography variant="body1" color="white">
                    Remove from Garden
                  </Typography>
                </Button>
              </div>
            </div>
           
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default PlantCard;
