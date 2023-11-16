export function clearLocalStorageKey(key) {
  localStorage.removeItem(key);
}

export function getFromLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : initialValue;
}

export function addToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function deleteEventFromLocalStorage(userEmail, eventId) {
  const users = getFromLocalStorage("users", []);
  const userIndex = users.findIndex((user) => user.email === userEmail);
  if (userIndex !== -1) {
    users[userIndex].events = users[userIndex].events.filter(
      (event) => event.uuid !== eventId
    );
    addToLocalStorage("users", users);
    return users;
  }
  return null;
}

export function updateEventFromLocalStorage(userEmail, eventId, editedEvent) {
  const users = getFromLocalStorage("users", []);

  // Creare un nuovo array di utenti con l'array degli eventi aggiornato
  const updatedUsers = users.map((user) => {
    if (user.email === userEmail) {
      // Se è l'utente corretto, aggiorna l'array degli eventi
      return {
        ...user,
        events: user.events.map((event) =>
          event.uuid === eventId ? editedEvent : event
        ),
      };
    }
    return user;
  });

  // Aggiorna il localStorage con l'array degli utenti aggiornato
  addToLocalStorage("users", updatedUsers);

  return updatedUsers;
}

