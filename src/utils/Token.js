export const setToken =(token) =>{
    window.localStorage.setItem("accessToken", token);
}

export const getToken =() =>{
   return window.localStorage.getItem("accessToken");
}

export const removeToken =() =>{
    window.localStorage.removeItem("accessToken");
}