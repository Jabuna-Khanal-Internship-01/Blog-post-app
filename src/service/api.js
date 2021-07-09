import http from "../utils/http";
import config from "../config";

const { api } = config;

/*for Authneticaion */
export async function logIn(tokenId) {
  const url = `${api.endpoints.auth}`;
  const response = await http.post(url, tokenId);
  return response;
}

/* fetch all post */
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
  const response = result.data.data;
  return response;
}

/*creating ,deleting,updating post */
export async function createPost(post) {
  const url = `${api.endpoints.posts}`;
  const response = await http.post(url,post);
 
  return response;
}
export async function updatePost(id,post){
  console.log(id);
  const url = `${api.endpoints.posts}/${id}`;
  const response = await http.put(url,post);
  return response;
}

export async function deletePost(id){
  const url = `${api.endpoints.posts}/${id}`;
  const response = await http.delete(url);
  return response;
}

/*Fetching the  user detail for profile */
export async function getUserDetail(id){
  const url = `${api.endpoints.users}/${id}`;
  const response = await http.get(url);
  return response;
}

export async function updateUserDetail(id, detail){
  const url = `${api.endpoints.users}/${id}`;
  const response = await http.put(url,detail);
  return response;

}

/*for updating,adding and deleting comment */
export async function addComment(id,description){
  const url = `${api.endpoints.posts}/${id}/comments`;
  const response = await http.post(url,description);
  console.log(response,'-------')
  return response;
}

export async function deleteComment(id){
  const url = `${api.endpoints.comments}/${id}`;
  const response = await http.delete(url);
  return response;
}

export async function updateComment(id,description){
  const url = `${api.endpoints.comments}/${id}`;
  const response = await http.put(url,description);
  return response;
}