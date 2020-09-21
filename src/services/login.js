const { BASE_URL } = require("../config/url");

function login(username, password) {
  fetch(BASE_URL + "/login", {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then((res) => res.json)
    .then((json) => {
      if (json.status === true) {
        return login_status.success;
      } else {
        return login_status[json.message];
      }
    })
    .catch((error) => console.log(error));
}

const login_status = {
  success: "success",
  login_fail: "login_fail",
  server_error: "server_error",
};

module.exports = {
  login: login,
  login_status: login_status,
};
