import React, { Component } from "react";
import { download } from "../services/image";
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
    // console.log(this.props.Filename);
    download(this.props.Filename).then((url) => {
      this.setState({ ImgUrl: url });
    });
  }
  render() {
    const { Username, Text, ImgUrl } = this.state;
    return (
      <div id="petCard">
        <img className="profileImg" alt="home" src={ImgUrl}></img>
        <div className="box">
          <div className="name">{Username}</div>
          <div className="text">{Text}</div>
        </div>
      </div>
    );
  }
}

export default PersonCard;

// For fetch image: {src && <img alt="home" src={src}></img>}
