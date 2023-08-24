import { useState, createContext } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const persistedUserData = JSON.parse(localStorage.getItem("userData")) || {};
  const persistedFollowingData =
    JSON.parse(localStorage.getItem("followingData")) || [];
  const [user, setUser] = useState(persistedUserData);
  const [following, setFollowing] = useState(persistedFollowingData);

  function setUserData(data) {
    setUser(data);
    localStorage.setItem("userData", JSON.stringify(data));
  }

  function setFollowingData(data) {
    setFollowing(data);
    localStorage.setItem("followingData", JSON.stringify(data));
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, setUserData, following, setFollowingData }}
    >
      {children}
    </UserContext.Provider>
  );
}
