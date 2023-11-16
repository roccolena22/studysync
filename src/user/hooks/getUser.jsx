import { getFromLocalStorage } from "./localStorageHooks";

export function getUser(email) {
  const users = getFromLocalStorage("users", []);
  return users.find((user) => user.email === email);
}
