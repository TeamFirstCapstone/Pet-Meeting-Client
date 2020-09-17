import React, { Component } from "react";
import "./Login.scss";
import Logo from "../images/logo.png";
import imgBackground from "../images/login_background.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      login_error: "",
      logined: sessionStorage.getItem("logined"),
    };

    const hidden = {
      username: localStorage.getItem("hidden_username"),
      created_date: localStorage.getItem("hidden_created_date"),
      hidden: localStorage.getItem("hidden_hidden"),
    };
    if (this.state.logined != null) {
      /** 1. 창을 껐다 켜는 경우 로그인 흔적이 남아 있는가
       *  2. 로그아웃하고 다시 로그인 할 경우 흔적을 인정할 것인가
       * => 로그아웃하면 모든 흔적을 지우는 걸로 한다.
       * => 단 1과의 구별을 위해 session storage의 logined는 false로 유지한다.
       */
      fetch("http://localhost:4000/login", {
        method: "post",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ hidden: hidden }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.result === true) sessionStorage.setItem("logined", true);
        })
        .catch((error) => console.log(error));
    }
  }

  handlechange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  submit = (event) => {
    const { username, password } = this.state;

    if (username === "") this.setState({ login_error: "username is null" });
    else if (password === "")
      this.setState({ login_error: "password is null" });
    else {
      fetch("http://localhost:4000/login", {
        method: "post",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.result === true) {
            alert("Login Successful!");
            localStorage.setItem("hidden_username", username);
            localStorage.setItem("hidden_created_date", new Date());
            localStorage.setItem("hidden_hidden", json.hidden);

            setTimeout(() => this.logout(), json.expired); // 시간 지나면 자동 로그아웃
            console.log(json.expired);
          } else this.setState({ login_error: "login failed" });
        })
        .catch((error) => console.log(error));
    }
  };

  logout = () => {
    localStorage.removeItem("hidden_username");
    localStorage.removeItem("hidden_created_date");
    localStorage.removeItem("hidden_hidden");

    sessionStorage.setItem("logined", false);
    alert("logout!");
  };

  enterPressed = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) this.submit();
  };
  render() {
    const { login_error } = this.state;
    return (
      <div id="login">
        <img className="logo" src={Logo} alt="" />
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
                  return <div className="login_error">Press your home key</div>;
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
