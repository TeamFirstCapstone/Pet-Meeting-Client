import React, { Component } from "react";
import PetCard from "./PetCard";
import "./SideBar.scss";

class SideBar extends Component {
  constructor(props) {
    super();
    this.state = {
      width: "30%",
    };
  }

  data = {
    name: "Rosemary",
    year: 8,
    gender: "female",
    species: "Singapura cat",
    imgUrl: "http://localhost:4000/img/sample.png",
  };

  render() {
    const data = this.data;
    return (
      <div>
        <PetCard {...data}></PetCard>
      </div>
    );
  }
}

export default SideBar;
