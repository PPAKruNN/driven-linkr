import { useContext } from "react";
import { UserContext } from "../context/user.context";

export default function useUserContext() {
  return useContext(UserContext);
}