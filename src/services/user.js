const { BASE_URL } = require("../config/url");

const login_status = {
  success: "success",
  login_fail: "login_fail",
  server_error: "server_error",
};

const signup_status = {
  success: "success",
  login_fail: "signup_fail",
  server_error: "server_error",
};

function logined() {
  return fetch(`${BASE_URL}/user/logined`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      return json.status;
    });
}

function login(username, password) {
  return fetch(BASE_URL + "/user/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.status === true) return login_status.success;
      else return login_status[json.message];
    });
}

function signup(username, password, email, phone) {
  return fetch(BASE_URL + "/user/signup", {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      phone: phone,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.status === true) return signup_status.success;
      else return signup_status[json.message];
    });
}

module.exports = {
  logined: logined,
  signup: signup,
  login: login,
  signup_status: signup_status,
  login_status: login_status,
};
