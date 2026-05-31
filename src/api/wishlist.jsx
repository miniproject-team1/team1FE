import axios from "axios";

const BASE_URL = "https://team1.z0.co.kr";

const getToken = () => localStorage.getItem("accessToken");
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

export const getWishlist = async () => {
  const res = await axios.get(`${BASE_URL}/api/v1/wishlist`, {
    headers: authHeader(),
  });
  return res.data;
};

export const addWishlist = async (data) => {
  const res = await axios.post(`${BASE_URL}/api/v1/wishlist`, data, {
    headers: authHeader(),
  });
  return res.data;
};

export const updateWishlist = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/api/v1/wishlist/${id}`, data, {
    headers: authHeader(),
  });
  return res.data;
};

export const deleteWishlist = async (id) => {
  const res = await axios.delete(`${BASE_URL}/api/v1/wishlist/${id}`, {
    headers: authHeader(),
  });
  return res.data;
};

export const purchaseWishlist = async (id) => {
  const res = await axios.patch(
    `${BASE_URL}/api/v1/wishlist/${id}/purchase`,
    { purchased: true },
    { headers: authHeader() }
  );
  return res.data;
};
