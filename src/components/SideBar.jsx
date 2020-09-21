import React, { Component } from "react";
import PersonCard from "./PersonCard";
import PetCard from "./PetCard";
import "./SideBar.scss";

class SideBar extends Component {
  constructor(props) {
    super();
    this.state = {
      width: "30%",
    };
  }

  pet_data = {
    name: "Rosemary",
    year: 8,
    gender: "female",
    species: "Singapura cat",
    imgUrl: "http://localhost:4000/img/sample.png",
  };
  person_data = {
    name: "Rosemary",
    text: `What did you do yesterday? \
            I don’t know what I have...`,
    imgUrl: "http://localhost:4000/img/sample.png",
  };

  render() {
    const data = this.data;
    return (
      <div>
        <PersonCard {...this.person_data}></PersonCard>
      </div>
    );
  }
}

export default SideBar;
