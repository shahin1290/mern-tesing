import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);

export const createProduct = (productData) =>
  API.post("/products", productData);
export const getProducts = (page) => API.get(`/products?page=${page}`);
export const getProduct = (id) => API.get(`/products/${id}`);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (updatedProductData, id) =>
  API.patch(`/products/${id}`, updatedProductData);
