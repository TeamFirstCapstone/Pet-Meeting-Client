const { BASE_URL } = require("../config/url");

const signup_status = {
  success: "success",
  login_fail: "signup_fail",
  server_error: "server_error",
};

function signup(username, password, email, phone) {
  return fetch(BASE_URL + "/signup", {
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
    })
    .catch((error) => console.log(error));
}

module.exports = {
  signup: signup,
  signup_status: signup_status,
};
