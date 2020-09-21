import { login, login_status } from "../src/services/login";
test("user login successfully", () => {
  const result = login("a", "b");
  expect(result).toBe(login_status.success);
});
