import React, { Component } from "react";
import "./Entrust.scss";
import SideBar from "../components/SideBar";
import imgPlus from "../images/plus.png";

class Entrust extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
    };
  }

  render() {
    return (
      <div id="entrust">
        <SideBar />
        <main>
          <div className="title">Entrust application</div>
          <div className="formbox">
            <div className="pets">
              <div className="name">Choose your pet to entrust</div>
              <div className="box">
                <img className="item" src="https://picsum.photos/200/300" />
                <img className="item plus" src={imgPlus} />
              </div>
            </div>
            <div className="fills">
              <div className="name">Fill the under blanks</div>
              <div className="tablebox">
                <div className="name">Date</div>
                <input type="text" />
                <div className="name">Housing Form</div>
                <div className="div">asdf</div>
                <div className="name">Else</div>
                <div className="div">asdf</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Entrust;
