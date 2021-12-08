import React, { useEffect, useState } from "react";
import {
  Card,
  Icon,
  Progress,
  Grid,
  Image,
  Form,
  Button,
} from "semantic-ui-react";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);

  const [plantCount, setPlantCount] = useState(0);

  const [username, setUsername] = useState("");

  const plantData = data?.me.myPlants || [];

  const userData = data?.me || [];

  const NumbofPlants = () => (
    <Progress
      progress="value"
      color="brown"
      value={plantCount}
      label="Number of Plants"
      style={{ width: "300px", display: "flex", alignItems: "center" }}
    />
  );

  useEffect(() => {
    if (data) {
      setPlantCount(plantData.length);
      setUsername(userData.username);
    }
  }, [data, userData, plantData]);

  return (
    <>
      {Auth.loggedIn() ? (
        <div id="proCardCont">
          <Grid>
            <Grid.Column width={4}>
              <Card>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>
                    <span className="date">
                      Date Joined: {userData.createdAt}
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    Located in: {userData.location}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="tree" />
                  {plantCount} Plants
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={9}>
              <Form>
                <Form.Input
                  label="Bio"
                  placeholder="Tell us some things about yourself!"
                />

                <Button>Save</Button>
              </Form>
            </Grid.Column>
            <Grid.Column width={3}>
              <NumbofPlants id="numOfPlants" />
            </Grid.Column>
          </Grid>
        </div>
      ) : (
        <div className="content-container">
          <Grid stackable columns={1}>
            <Grid.Column textAlign="center" width={16}>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                style={{
                  textAlign: "center",
                  fontFamily: "Oswald, sans-serif",
                  color: "#EBDBAE",
                }}
              >
                You Must Make an Account to Manage your Garden
              </Typography>
            </Grid.Column>
          </Grid>
        </div>
      )}
    </>
  );
}
