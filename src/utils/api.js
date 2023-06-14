import axios from "axios";

let AppURL = "http://localhost:9090/api/";
if (process.env.NODE_ENV === "production") {
  AppURL = "http://3.8.19.187:9090/api/";
}

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
