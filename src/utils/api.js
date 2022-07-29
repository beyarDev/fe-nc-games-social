import axios from "axios";
const AppURL = "https://nc-games-social.herokuapp.com/api/";
export function getData(url, queryObject) {
  return axios.get(`${AppURL}${url}`, {
    params: queryObject,
  });
}

export function patchData(url, bodyObject) {
  return axios.patch(`${AppURL}${url}`, bodyObject);
}

export function postData(url, bodyObject) {
  return axios.post(`${AppURL}${url}`, bodyObject);
}

export function deleteComment(commentId) {
  return axios.delete(`${AppURL}comments/${commentId}`);
}
