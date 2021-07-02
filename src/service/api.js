import http from "../utils/http";
import config from "../config";

const{ api } = config;


export async function getPosts(){
    const url = `${api.endpoints.posts}/`;
    const response = await http.get(url);
    return response;
};

export async function getPostBySearchText(searchInput){
    const url =`${api.endpoints.posts}?searchKey=${searchInput}`;
    const response = await http.get(url);
    return response;
}

