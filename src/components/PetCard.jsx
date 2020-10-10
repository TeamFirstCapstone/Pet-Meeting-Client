import React, { Component } from "react";
import "./PetCard.scss";

class PetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      ...props,
    };
  }
  componentDidMount() {
    fetch(this.props.imgUrl)
      .then((res) => res.blob())
      .then((blob) => {
        this.setState({ src: URL.createObjectURL(blob) });
      });
  }

  render() {
    const { Name, Year, Gender, Species, ImgUrl } = this.state;
    return (
      <div id="petCard">
        <img className="profileImg" alt="home" src={ImgUrl}></img>
        <div className="box">
          <div className="name">{Name}</div>
          <div className="yeargender">
            <div className="year">{Year} years old</div>
            <div className="gender">
              {Gender === "female" ? (
                <i className="fas fa-venus female"></i>
              ) : (
                <i className="fas fa-mars male"></i>
              )}
            </div>
          </div>
          <div className="species">{Species}</div>
        </div>
      </div>
    );
  }
}

export default PetCard;

// For fetch image: {src && <img alt="home" src={src}></img>}
