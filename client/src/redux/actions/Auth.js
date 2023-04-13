import axios from "axios";

const csrfToken = document.cookie.match(/XSRF-TOKEN=(\w+)/);
console.log(csrfToken);

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    common: {
      "X-CSRF-TOKEN": csrfToken,
      "X-Requested-With": "XMLHttpRequest",
    },
  }
});

// Agregamos el interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      return Promise.reject({ error: "Invalid email or password" });
    } else {
      return Promise.reject({ error: "An error occurred, please try again later." });
    }
  }
);

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await instance.post("/login", { email, password });
    localStorage.setItem("token", response.data.token);
    dispatch({ type: "LOGIN_SUCCESS", payload: { token: response.data.token } });
  } catch (error) {
    return error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return { type: "LOGOUT_SUCCESS" };
};
