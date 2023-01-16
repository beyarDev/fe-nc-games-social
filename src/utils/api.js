import axios from "axios";
const AppURL = "http://13.42.22.87/api/";
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
