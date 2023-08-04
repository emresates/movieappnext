const API_URL = "http://localhost:3000/api/comments/";

export const fetchCreateComment = async (data) => {
  const newData = {
    text: data?.text,
    productID: data?.productID,
    user: data?.user,
    type: data?.type,
  };
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchSingleComment = async (commentID) => {
  try {
    const response = await fetch(`${API_URL}${commentID}`, {
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

export const fetchDeleteComment = async (commentID) => {
  try {
    const response = await fetch(`${API_URL}${commentID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};
