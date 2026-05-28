const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem("accessToken");

// 위시리스트 목록 조회
export const getWishlist = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

// 위시리스트 추가
export const addWishlist = async (data) => {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// 위시리스트 수정
export const updateWishlist = async (id, data) => {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// 위시리스트 삭제
export const deleteWishlist = async (id) => {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

// 구매 완료 처리
export const purchaseWishlist = async (id) => {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist/${id}/purchase`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};