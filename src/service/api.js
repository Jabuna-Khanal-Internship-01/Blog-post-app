import http from "../utils/http";
import config from "../config";

const { api } = config;

export async function logIn(tokenId) {
  const url = `${api.endpoints.auth}`;
  const response = await http.post(url, tokenId);
  const id = response.data.data.id;
  return id;
}

export async function getPosts() {
  const url = `${api.endpoints.posts}`;
  const response = await http.get(url);
  return response;
}

export async function getPostBySearchText(searchInput) {
  const url = `${api.endpoints.posts}?searchKey=${searchInput}`;
  const response = await http.get(url);
  return response;
}

export async function getPostById(id) {
  const url = `${api.endpoints.posts}/${id}`;
  const result = await http.get(url);
  const response = result.data.data.comments;
  return response;
}

export async function createPost(post) {
  const url = `${api.endpoints.posts}`;
  const response = await http.post(url,post);
  console.log(response, "posted");
  return response;
}
