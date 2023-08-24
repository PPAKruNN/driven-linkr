import { useState, createContext } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const persistedUserData = JSON.parse(localStorage.getItem("userData")) || {};
  const [user, setUser] = useState(persistedUserData);

  function setUserData(data) {
    setUser(data);
    localStorage.setItem("userData", JSON.stringify(data))
  }

  return (
    <UserContext.Provider value={{ user, setUser, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}