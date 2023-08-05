const API_URL = "http://localhost:3000/api/products";

export const fetchSinglePostData = async (productID) => {
  try {
    const response = await fetch(`${API_URL}/${productID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};
