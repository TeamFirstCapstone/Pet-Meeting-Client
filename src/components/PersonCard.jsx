import React, { Component } from "react";
import "./PersonCard.scss";

class PersonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      ...props,
    };
  }
  componentDidMount() {
    fetch(this.state.imgUrl)
      .then((res) => res.blob())
      .then((blob) => {
        this.setState({ src: URL.createObjectURL(blob) });
      });
  }
  render() {
    const { Name, Text, ImgUrl } = this.state;
    return (
      <div id="petCard">
        <img className="profileImg" alt="home" src={ImgUrl}></img>
        <div className="box">
          <div className="name">{Name}</div>
          <div className="text">{Text}</div>
        </div>
      </div>
    );
  }
}

export default PersonCard;

// For fetch image: {src && <img alt="home" src={src}></img>}
