import React, { Component } from "react";
import "./Login.scss";
import imgBackground from "../images/login_background.png";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { user } from "../service";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      login_error: "",
    };
  }

  componentDidMount = () => {
    console.log(this.props);
    user.logined().then((status) => this.props.history.push("main"));
  };

  handlechange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  submit = (event) => {
    const { username, password } = this.state;

    if (username === "") this.setState({ login_error: "username is null" });
    else if (password === "")
      this.setState({ login_error: "password is null" });
    else {
      user
        .login({ username, password })
        .then(() => this.props.history.push("main"))

        .catch((message) => {
          console.log("Error " + message);
          // Login 틀림
          if (message === "No User!") {
            this.setState({ login_error: "login failed" });
            alert("Login fail check more");
          } else {
            alert("Server Error!");
          }
        });
    }
  };

  enterPressed = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) this.submit();
  };
  render() {
    const { login_error } = this.state;
    return (
      <div id="login">
        <Logo />
        <div className="signin">
          <div className="title">Log in</div>
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
            <Link className="signup" to="signup">
              Register
            </Link>
            <button className="submit" onClick={this.submit}>
              Submit
            </button>
            {(function () {
              switch (login_error) {
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
            })(login_error)}
          </div>
        </div>
        <img className="background" src={imgBackground} alt="" />
      </div>
    );
  }
}

export default Login;

/*
#4dff4d
#36b336
#4dffff
#b8ff4d
#81b336
https://colors.muz.li/palette/4dff4d/36b336/4dffff/b8ff4d/81b336
*/
