import React, { Component } from "react";
import PersonCard from "./PersonCard";
import PetCard from "./PetCard";
import "./SideBar.scss";
import mock from "../mocks/Sidebar";

class SideBar extends Component {
  constructor(props) {
    super();
    this.state = {
      width: "30%",
    };
  }

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
