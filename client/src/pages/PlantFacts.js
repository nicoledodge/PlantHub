import React, { Component } from "react";
import RandomFacts from "../components/RandomFacts";
import facts from "./FactsDB";
import { Container } from "semantic-ui-react";

export default class PlantFacts extends Component {
  state = {
    fact: facts[0].fact,
  };

  generateRandomFact = (arr) => {
    let num = Math.floor(Math.random() * facts.length);

    let newFact = facts[num];

    this.setState({
      fact: newFact.fact,
    });

    this.shuffleFacts(facts);
  };

  shuffleFacts = (arr) => {
    return arr.sort(function () {
      return 0.5 - Math.random();
    });
  };

  render() {
    return (
      <Container>
        <div className="container">
          <h1
            className="text-center"
            style={{
              textAlign: "center",
              fontFamily: "Oswald, sans-serif",
              marginLeft: "20px",
              marginTop: "80px",
            }}
          >
            Random Plant Fact
          </h1>
          <RandomFacts
            style={{ marginLeft: "20px" }}
            generateRandomFact={this.generateRandomFact}
            fact={this.state}
          />
        </div>
      </Container>
    );
  }
}
