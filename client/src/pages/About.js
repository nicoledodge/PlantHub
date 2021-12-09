import React from "react";
import aboutImage from "./assets/vines.jpeg";

export default function About() {
  return (
    <>
      <img className="about-img" src={aboutImage} alt={"vines"} />
      <div className="about-container " style={{ display: "flex" }}>
        <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: '3em'}}>ABOUT US</h2>
        <p
          className="about-child"
          style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}
        >
          Welcome to PlantHub! Your number one tool to help keep your plants
          alive and thriving. We're dedicated to providing you the best platform
          to track your plants needs. We hope you enjoy our services as much as
          we enjoy offering them to you.
          <br></br>
          Sincerely,<br></br>
          PlantHub
        </p>
      </div>
    </>
  );
}
