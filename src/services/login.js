const { BASE_URL } = require("../config/url");

const login_status = {
  success: "success",
  login_fail: "login_fail",
  server_error: "server_error",
};

function login(username, password) {
  return fetch(BASE_URL + "/user/login", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: `username=${username}&password=${password}`,
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.status === true) return login_status.success;
      else return login_status[json.message];
    });
}

module.exports = {
  login: login,
  login_status: login_status,
};
