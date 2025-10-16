"use client";

import axios from "axios";

const BASE_URL = "/api/collections";

export function useCollectionApi() {
  // 🔹 Get all collections
  const getCollectionsApi = async () => {
    const res = await axios.get(BASE_URL);
    return res.data.data;
  };

  // 🔹 Get collection by ID
  const getCollectionByIdApi = async (id: string) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data.data;
  };

  // 🔹 Create new collection
  const createCollectionApi = async (data: {
    title: string;
    description: string;
    image: string;
  }) => {
    const res = await axios.post(BASE_URL, data);
    return res.data.data;
  };

  // 🔹 Update collection
  const updateCollectionApi = async (
    id: string,
    data: { title?: string; description?: string; image?: string }
  ) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data.data;
  };

  // 🔹 Delete collection
  const deleteCollectionApi = async (id: string) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data.data;
  };

  return {
    getCollectionsApi,
    getCollectionByIdApi,
    createCollectionApi,
    updateCollectionApi,
    deleteCollectionApi,
  };
}
