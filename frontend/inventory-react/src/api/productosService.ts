import axios from "axios";
const API_URL = "http://localhost:5001/api/Productos";

export const getProductos = (pageNumber = 1, pageSize = 10) =>
  axios.get(`${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);

export const getProducto = (id: number) => axios.get(`${API_URL}/${id}`);

export const createProducto = (data: any) => axios.post(API_URL, data);

export const updateProducto = (id: number, data: any) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteProducto = (id: number) => axios.delete(`${API_URL}/${id}`);
