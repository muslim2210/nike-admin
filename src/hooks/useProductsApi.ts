"use client";

import { ProductFormType } from "@/lib/schema";
import axios from "axios";

const BASE_URL = "/api/products";

export function useProductsApi() {
  // 🔹 Get all collections
  const getProductsApi = async () => {
    const res = await axios.get(BASE_URL);
    return res.data.data;
  };

  // 🔹 Get collection by ID
  const getProductByIdApi = async (id: string) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data.data;
  };

  // 🔹 Create new collection
  const postProductApi = async (data: ProductFormType) => {
    const res = await axios.post(BASE_URL, data);
    return res.data.data;
  };

  // 🔹 Update collection
  const updateProductApi = async (
    id: string,
    data: ProductFormType
  ) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data.data;
  };

  // 🔹 Delete collection
  const deleteProductApi = async (id: string) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data.data;
  };

  return {
    getProductsApi,
    getProductByIdApi,
    postProductApi,
    updateProductApi,
    deleteProductApi,
  };
}
