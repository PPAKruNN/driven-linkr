import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function tokenProvider(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
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

function followUser(auth, id) {
  const promise = axios.post(`${API_URL}/users/${id}/follow`, {}, tokenProvider(auth));
  
  return promise;
}

function submitComment(auth, postId, message) {
  const promise = axios.post(`${API_URL}/commentaries`, {postId, message}, tokenProvider(auth));

  return promise;
}

function getComments(auth, postId) {
  const promise = axios.get(`${API_URL}/commentaries/${postId}`, tokenProvider(auth));

  return promise;
}

function getFollowing(auth) {
  const promise = axios.get(`${API_URL}/users/following`, tokenProvider(auth));

  return promise;
}

function unFollowUser(auth, id) {
  const promise = axios.delete(`${API_URL}/users/${id}/unfollow`, tokenProvider(auth));

  return promise;
}

const api = {
  searchUsers,
  signIn,
  signUp,
  getUserPosts,
  followUser,
  unFollowUser,
  getFollowing,
  submitComment,
  getComments
};

export default api;