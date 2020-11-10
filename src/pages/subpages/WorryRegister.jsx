import React, { Component } from "react";
import "./WorryRegister.scss";
import { worry } from "../../service";

class WorryRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: null,
    };
  }

  submit = (e) => {
    const { title, text } = this.state;

    if (title !== "" && text !== null) {
      worry
        .create({ text, title })
        .then(() => {
          alert("register successfully");
          this.props.history.push("/main");
        })
        .catch(() => alert("Something Error!!"));
    } else {
      alert("Fill all!!");
    }
  };

  handleTextChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div id="WorryRegister">
        <table className="table-register">
          <tr>
            <th className="active">Title</th>
            <td>
              <input
                className="form-control-1"
                placeholder="제목을 입력하세요."
                name="title"
                onChange={this.handleTextChange}
              />
            </td>
          </tr>
          <tr>
            <th className="active">Content</th>
            <td>
              <textarea
                className="form-control-2"
                name="text"
                onChange={this.handleTextChange}
              />
            </td>
          </tr>
        </table>
        <div className="article-register">
          <input
            type="button"
            className="btn btn-register"
            value="Register"
            onClick={this.submit}
          />
        </div>
      </div>
    );
  }
}

export default WorryRegister;
