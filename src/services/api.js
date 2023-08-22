import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function tokenProvider(auth) {
  return {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
}

function searchUsers(auth, string) {
  const promise = axios.get(`${API_URL}/users/search/${string}`, tokenProvider(auth));

  return promise;
}

function getUserPosts(auth, id) {
  const promise = axios.get(`${API_URL}/users/${id}/posts`, tokenProvider(auth));

  return promise;
}

function signIn(payload) {
  const promisse = axios.post(`${API_URL}/signin`, payload);

  return promisse;
}

function signUp(payload) {
  const promisse = axios.post(`${API_URL}/signup`, payload);

  return promisse;
}

const api = {
  searchUsers,
  signIn,
  signUp,
  getUserPosts,
};

export default api;