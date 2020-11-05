import React, { Component } from "react";
import "./Signup.scss";
import imgBackground from "../images/login_background.png";
import Logo from "../components/Logo";
import { user } from "../service";

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
    this.history = props.history;
    user
      .logined()
      .then((status) => (status ? this.history.push("/main") : null));
  }

  handlechange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  submit = (event) => {
    const { username, password, email, phone } = this.state;

    if (username === "") this.setState({ signup_error: "username is null" });
    else if (password === "")
      this.setState({ signup_error: "password is null" });
    else {
      user
        .signup({ username, password, email, phone })
        .then(() => {
          alert("Signup successfully");
          this.history.push("/login");
        })
        .catch((message) => {
          if (message === "User already exists") {
            alert(message);
            this.setState({ signup_error: message });
          } else if (message === "Parameter Error") {
            // Empty
          } else {
            alert("Server Error!");
            console.log(message);
          }
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
