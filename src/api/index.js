import axios from "axios";

const url1 = "/puzzle";
const url2 = "/prediction";
const url3 = "/point";

const API = axios.create({ baseURL: "http://localhost:4000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).access_token
    }`;
  }
  return req;
});

export const fetchTeeth = () => {
  return API.get(url1);
};

export const createTeeth = (newPuzzle) => {
  return API.post(url2, newPuzzle, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createPoint = (newPuzzle) => {
  return API.post(url3, newPuzzle);
};

export const girisYap = (formData) => API.post("/auth/signin", formData);
export const uyeOl = (formData) => API.post("/users", formData);

export const getLastPredictionByUserId = (userId) => {
  return API.get(`/prediction/last/${userId}`);
};

export const getAllPredictionsByUserId = (userId) => {
  return API.get(`/prediction/${userId}`);
};
