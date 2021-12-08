import React, { useEffect, useState } from "react";
// import {Card, Icon} from 'semantic-ui-react';
import {
  Progress,
  Button,
  Icon,
  Table,
  Segment,
  Grid,
  Header,
  List,
} from "semantic-ui-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { ADD_WATER, REMOVE_PLANT } from "../utils/mutations";
// import Auth from '../utils/auth'

//possibly make every card dynamic
//also thinking about making mygarden a parent div so we can pass the cards through as components as well as the detailed view of each plant
export default function MyGarden() {
  const { loading, data } = useQuery(QUERY_USER);

  const [addWater, { error }] = useMutation(ADD_WATER);

  const [removePlant, { err }] = useMutation(REMOVE_PLANT);

  const plantData = data?.user.myPlants || [];

  const userData = data?.user || [];

  // const [plantData, setPlantData] = useState(data?.user.myPlants|| [])

  // console.log(plantData)

  //console.log(loading? "loading" : plantData)

  const [percent, setPercent] = useState(0);
  const [plantCount, setPlantCount] = useState(0);
  const [username, setUsername] = useState("");
  // const [birthday, setBirthday] = useState('')

  const handleAddWater = async (plantId) => {
    // get token
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }
    // const plantData = data?.user.myPlants || {};

    console.log("PlantID:" + plantId);
    try {
      const { plantData } = await addWater({
        variables: { plantId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePlant = async (plantId) => {
    // get token
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }
    // const plantData = data?.user.myPlants || {};

    console.log("PlantID:" + plantId);
    try {
      const { plantData } = await removePlant({
        variables: { plantId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (plantData) {
      // console.log(data.length)
      // console.log(plantData.length)
      console.log(plantData);
      console.log(userData.username);
      //console.log(parseInt(plantData[0].waterNeeded))
      // document.plant = data
      let newPercent = plantData.map((plant, i) => {
        let x = plant.waterAdded;
        let y = plant.waterNeeded;
        return (x / y) * 100;
      });
      //     console.log(newPercent)
      setPercent(newPercent);
      setPlantCount(plantData.length);
      setUsername(userData.username);
    }
  }, [data, plantData]);

  return (
    <>
      <br></br>
      <div className="garden-container">
        <br></br>
        <div style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              p: 1,
              m: 1,
            }}
          >
            <Grid divided inverted stackable>
              <Grid.Column width={14}>
                <Header inverted as="h4">
                  Hello {username}, welcome to your garden!
                </Header>
                {/* <List link inverted>
                            <List.Item as='a'>FAQs</List.Item>
                            <List.Item as='a'>Privacy</List.Item>
                            <List.Item as='a'>Careers</List.Item>
                            <List.Item as='a'>Help Center</List.Item>
                        </List> */}
              </Grid.Column>
              <Grid.Column width={16} textAlign="center">
                <Table compact celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{
                            textAlign: "center",
                            fontFamily: "Fuzzy Bubbles, cursive",
                          }}
                        >
                          Plant
                        </Typography>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{
                            textAlign: "center",
                            fontFamily: "Fuzzy Bubbles, cursive",
                          }}
                        >
                          Nickname
                        </Typography>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{
                            textAlign: "center",
                            fontFamily: "Fuzzy Bubbles, cursive",
                          }}
                        >
                          Hydration Status
                        </Typography>
                      </Table.HeaderCell>
                        <Table.HeaderCell>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            style={{
                              textAlign: "center",
                              fontFamily: "Fuzzy Bubbles, cursive",
                            }}
                          >
                            Water
                          </Typography>
                        </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {plantData.map((plant, i) => (
                      <Table.Row>
                        <Table.Cell>
                          {" "}
                          <Typography variant="body2" color="text.secondary">
                            {plant.name}
                          </Typography>
                        </Table.Cell>
                        <Table.Cell>
                          {" "}
                          <Typography variant="body2" color="text.secondary">
                            {plant.name}
                          </Typography>
                        </Table.Cell>
                        <Table.Cell>
                          <Progress percent={percent[i]} color="blue" active>
                            <Typography variant="body2" color="text.secondary">
                              {percent[i]}% watered this week
                            </Typography>
                          </Progress>
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            id={plant.name}
                            floated="right"
                            icon
                            labelPosition="right"
                            primary
                            size="small"
                            onClick={() => handleAddWater(plant._id)}
                          >
                            <Icon name="tint" />
                            <Typography variant="body2" color="text.secondary">
                              Add Water
                            </Typography>
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>

                  <Table.Footer fullWidth>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell colSpan="8">
                        <Segment textAlign="right">
                          <Typography variant="body2" color="text.secondary">
                            You have {plantCount} plants in your garden{" "}
                          </Typography>
                        </Segment>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Grid.Column>
              <Grid.Column width={3}></Grid.Column>
            </Grid>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              p: 1,
              m: 1,
            }}
          >
            {plantData.map((plant, i) => (
              <Card
                id="team-card"
                sx={{ maxWidth: 345, margin: 1, bgcolor: "#d9cba1" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image="./images/nikki-profile-pic.jpg"
                    alt={plant.name}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontFamily: "Fuzzy Bubbles, cursive",
                      }}
                    >
                      {plant.name}
                    </Typography>
                    <List>
                      <List.Item>
                        {" "}
                        <Typography variant="body2" color="text.secondary">
                          Plant Birthday: {plant.createdAt}
                        </Typography>
                      </List.Item>
                      <List.Item>
                        {" "}
                        <Typography variant="body2" color="text.secondary">
                          Plant Birthday: {plant.createdAt}
                        </Typography>
                      </List.Item>
                      <List.Item>
                        {" "}
                        <Typography variant="body2" color="text.secondary">
                          Plant Birthday: {plant.createdAt}
                        </Typography>
                      </List.Item>
                    </List>

                    <div style={{ textAlign: "center" }}>
                      <Button
                        id={plant.name}
                        floated="center"
                        icon
                        labelPosition="center"
                        primary
                        size="small"
                        onClick={() => handleDeletePlant(plant._id)}
                      >
                        <Icon name="tint" />
                        <Typography variant="body2" color="text.secondary">
                          Remove from Garden
                        </Typography>
                      </Button>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </div>
      </div>
    </>
  );
}
