
export const setUserName = (name) => {
  window.localStorage.setItem("name", name);
};

export const getUserName = () => {
  return window.localStorage.getItem("name");
};

export const removeUserName = () => {
  window.localStorage.removeItem("name");
};

export const userId = (id) => {
  window.localStorage.setItem("id", id);
};

export const getUserId = () => {
  return window.localStorage.getItem("id");
};

export const removeUserId = () => {
  window.localStorage.removeItem("id");
};
