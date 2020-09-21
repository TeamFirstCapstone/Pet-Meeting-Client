import React, { Component } from "react";
import "./PersonCard.scss";

class PersonCard extends Component {
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
    const { name, text, imgUrl } = this.state;
    return (
      <div id="petCard">
        <img className="profileImg" alt="home" src={imgUrl}></img>
        <div className="box">
          <div className="name">{name}</div>
          <div className="text">{text}</div>
        </div>
      </div>
    );
  }
}

export default PersonCard;

// For fetch image: {src && <img alt="home" src={src}></img>}
