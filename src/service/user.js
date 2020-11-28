import { method, fetchWithMethod } from "./base";
import { addImage, addImages } from "./image";

export function login({ username, password }) {
  const body = { username, password };
  return fetchWithMethod("/user/login", method.POST, body).then(
    (json) => json.uid
  );
}

export function signup({ username, password, email, phone }) {
  const body = { username, password, email, phone };
  return fetchWithMethod("/user/singup", method.POST, body).then(
    (json) => json.uid
  );
}

export const logined = () =>
  fetchWithMethod(`/user/logined`, method.GET).then((json) => json.result);

export const logout = () =>
  fetchWithMethod(`/user/logout`, method.GET).then((json) => json.result);

export const profile = () =>
  fetchWithMethod(`/user/profile`, method.GET)
    .then((json) => json.result)
    .then(({ user, pets, chats }) => {
      const userPromise = addImage(user);
      const petsPromise = addImages(pets);
      const chatsPromise = addImages(chats);

      return Promise.all([userPromise, petsPromise, chatsPromise]).then(
        ([user, pets, chats]) => {
          return { user, pets, chats };
        }
      );
    });
