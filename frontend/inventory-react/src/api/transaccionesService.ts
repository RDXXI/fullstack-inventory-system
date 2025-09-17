import axios from "axios";
const API_URL = "http://localhost:5002/api/Transacciones";

export const getTransacciones = (params: any) => axios.get(API_URL, { params });

export const getTransaccion = (id: number) => axios.get(`${API_URL}/${id}`);

export const createTransaccion = (data: any) => axios.post(API_URL, data);

export const updateTransaccion = (id: number, data: any) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteTransaccion = (id: number) =>
  axios.delete(`${API_URL}/${id}`);
