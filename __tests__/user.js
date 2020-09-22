const { login, login_status } = require("../src/services/login");

function fakeFetch(fakeJson) {
  return jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        json: () => fakeJson,
      });
    });
  });
}

describe("Login function", () => {
  test("user login successfully", async () => {
    global.fetch = fakeFetch({
      status: true,
    });
    return login("a", "b").then((result) =>
      expect(result).toEqual(login_status.success)
    );
  });
  test("user login fail", () => {
    global.fetch = fakeFetch({
      status: false,
      message: "login_fail",
    });

    return login("a", "b").then((result) =>
      expect(result).toEqual(login_status.login_fail)
    );
  });

  test("user server error", () => {
    global.fetch = fakeFetch({
      status: false,
      message: "server_error",
    });

    return login("a", "b").then((result) =>
      expect(result).toEqual(login_status.server_error)
    );
  });
});
