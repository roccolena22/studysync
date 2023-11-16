import { getFromLocalStorage } from "./localStorageHooks";

export function getUser(email) {
  const users = getFromLocalStorage("users", []);

  if (users && users.length > 0) {
    const user = users.find((user) => user.email === email);

    if (user && user.email) {
      return user;
    }
  }
  return null;
}
