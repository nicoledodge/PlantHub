import React from "react";
import facts from "../pages/FactsDB";
import { Button } from "semantic-ui-react";

export default function RandomFacts(props) {
  const { fact, generateRandomFact } = props;
  return (
    <div className="card" style={{ marginLeft: "20px" }}>
      <div className="card-body">
        <p
          className="card-text"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {fact.fact}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              generateRandomFact(facts);
            }}
            type="submit"
          >
            <i class="fas fa-mouse"></i> Click for Random Fact
          </Button>
          <Button
            className="ml-3"
            onClick={() => {
              generateRandomFact(facts);
              window.open(
                "https://twitter.com/intent/tweet/?text=" +
                  encodeURIComponent(fact.fact)
              );
            }}
            type="submit"
          >
            <i class="fab fa-twitter"></i> Share Fact
          </Button>
        </div>
      </div>
    </div>
  );
}
