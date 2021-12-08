import React from "react";
import homeImage from "./assets/hangingpots.jpeg";
import "../App.css";
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";

const Home = () => (
  <Segment style={{ padding: "0em 0em 5em" }} vertical>
    <img className="homeimg" src={homeImage} alt={"hanging flower pots"} />

    <Grid
      container
      stackable
      verticalAlign="middle"
      style={{ padding: "6em 0em" }}
    >
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Five Tip & Tricks for your house plants!
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Spin your plants around so they grow evenly and not lopsided. Every
            week.
          </p>
          <p style={{ fontSize: "1.33em" }}>
            Don’t fertilize in the winter. Only in the spring and summer.
          </p>
          <p style={{ fontSize: "1.33em" }}>
            Use pots with holes in them. Very helpful and necessary if you are a
            gardening newbie.
          </p>
          <p style={{ fontSize: "1.33em" }}>
            Try taking your houseplants outside for the summer and grow them in
            the shade. It is amazing how much they grow!
          </p>
          <p style={{ fontSize: "1.33em" }}>
            If you are prone to giving to watering too much, buy a moisture
            meter. It will help you learn how much water your plant needs.
          </p>
        </Grid.Column>
        <Grid.Column floated="right" width={6}>
          <Image
            bordered
            rounded
            size="large"
            src="/images/dogwithplant.jpeg"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Container text style={{ marginBottom: "80px" }}>
      <Header as="h3" style={{ fontSize: "2em" }}>
        Did you Know?
      </Header>
      <p style={{ fontSize: "1.33em" }}>
        If your potted houseplants dry out too quickly after watering, try this
        simple trick for keeping the soil moist longer. When repotting, tuck a
        damp sponge into the bottom of the pot before filling with soil. It will
        act as a water reservoir and may help prevent a gusher if you
        accidentally overwater.
      </p>
      <Button href="/PlantFacts" size="large">
        Read More About Plant Facts!
      </Button>
    </Container>
    <Grid celled="internally" columns="equal" stackable>
      <Grid.Row textAlign="center">
        <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
          <Header as="h3" style={{ fontSize: "2em" }}>
            "We Love how all of our house plants are all in one location! Makes
            watering much easier!"
          </Header>
        </Grid.Column>
        <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
          <Header as="h3" style={{ fontSize: "2em" }}>
            "Loved every minute of using PlantHub!"
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            <Image avatar src="./images/favicon.ico" />
            <b>Jen</b> Member since 2021
          </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Column
        textAlign="center"
        href="/MyGarden"
        style={{ marginTop: "30px" }}
      >
        <Button size="huge">Check Out Your Garden</Button>
      </Grid.Column>
    </Grid>
  </Segment>
);

export default Home;
