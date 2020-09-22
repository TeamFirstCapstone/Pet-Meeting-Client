import React, { Component } from "react";
import "./Signup.scss";
import imgBackground from "../images/login_background.png";
import Logo from "../components/Logo";
import { useHistory } from "react-router-dom";
import { signup, signup_status } from "../services/signup";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      phone: "",
      signup_error: "",
    };
  }

  handlechange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  submit = (event) => {
    const { username, password, email, phone } = this.state;

    if (username === "") this.setState({ signup_error: "username is null" });
    else if (password === "")
      this.setState({ signup_error: "password is null" });
    else {
      // return result which is one of login_status string
      signup(username, password, email, phone)
        .then((result) => {
          if (result === signup_status.success) {
            alert("Signup successful");
            // const history = useHistory();
            // history.push("/login");
          } else if (result === signup_status.login_fail) {
            alert("Login fail check more");
            this.setState({ signup_error: "login failed" });
          } else if (result === signup_status.server_error) console.log(result);
        })
        .catch((err) => {
          console.log(err);
          alert("Server Error!");
        });
    }
  };

  enterPressed = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) this.submit();
  };
  render() {
    const { signup_error } = this.state;
    return (
      <div id="login">
        <Logo />
        <div className="signin">
          <div className="title">Sign up</div>
          <div className="box">
            <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handlechange}
              onKeyPress={this.enterPressed}
            ></input>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlechange}
              onKeyPress={this.enterPressed}
            ></input>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handlechange}
              onKeyPress={this.enterPressed}
            ></input>
            <input
              type="text"
              name="phone"
              placeholder="phone"
              value={this.state.phone}
              onChange={this.handlechange}
              onKeyPress={this.enterPressed}
            ></input>
            <button className="submit" onClick={this.submit}>
              Submit
            </button>
            {(function () {
              switch (signup_error) {
                case "username is null":
                  return (
                    <div className="login_error">
                      I think you have a (user)name..
                    </div>
                  );
                case "password is null":
                  return (
                    <div className="login_error">
                      Press your entrance password
                    </div>
                  );
                case "login failed":
                  return (
                    <div className="login_error">
                      I recommend you to go hospital
                    </div>
                  );
                default:
                  return null;
              }
            })(signup_error)}
          </div>
        </div>
        <img className="background" src={imgBackground} alt="" />
      </div>
    );
  }
}

export default Signup;
