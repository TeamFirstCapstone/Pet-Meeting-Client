import React, { Component } from "react";
import "./scss/ShowoffRegister.scss";
import { showoff } from "../../service";

class ShowoffRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      file: null,
    };
  }

  submit = (e) => {
    const { text, file } = this.state;

    if (text !== "" && file !== null) {
      showoff
        .create(text, file)
        .then(() => this.props.history.push("/main"))
        .catch(() => alert("Something Error!!"));
    } else {
      alert("Fill all!!");
    }
  };

  handleTextChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleFileChange = (e) =>
    this.setState({ [e.target.name]: e.target.files[0] });

  render() {
    const { text } = this.state;
    return (
      <div id="ShowoffRegister">
        <div className="profile-icon">
          <input
            type="file"
            className="fas fa-image"
            name="file"
            accept="image/*"
            onChange={this.handleFileChange}
          />
        </div>
        <div className="guideline-showoffregister">
          upload image of your pet
        </div>
        <div className="article-body">Article Body</div>
        <textarea
          name="text"
          className="form-control-body"
          rows="7"
          placeholder="write input text"
          value={text}
          onChange={this.handleTextChange}
        />
        <div className="article-register">
          <input
            type="button"
            value="Showoff Register"
            className="btn-register"
            onClick={this.submit}
          />
        </div>
      </div>
    );
  }
}

export default ShowoffRegister;
