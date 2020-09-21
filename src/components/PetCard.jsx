import React, { Component } from "react";
import "./PetCard.scss";

class PetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      ...props,
    };

    fetch(this.props.imgUrl)
      .then((res) => res.blob())
      .then((blob) => {
        this.setState({ src: URL.createObjectURL(blob) });
      });
  }

  render() {
    const { name, year, gender, species, imgUrl } = this.state;
    return (
      <div id="petCard">
        <img className="profileImg" alt="home" src={imgUrl}></img>
        <div className="box">
          <div className="name">{name}</div>
          <div className="yeargender">
            <div className="year">{year} years old</div>
            <div className="gender">
              {gender === "female" ? (
                <i class="fas fa-venus female"></i>
              ) : (
                <i class="fas fa-mars male"></i>
              )}
            </div>
          </div>
          <div className="species">{species}</div>
        </div>
      </div>
    );
  }
}

export default PetCard;

// For fetch image: {src && <img alt="home" src={src}></img>}
