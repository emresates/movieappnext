const API_URL = "http://localhost:3000/api/users/";

const fetchSingleUserData = async (userID) => {
  try {
    const response = await fetch(`${API_URL}/${userID}`, {
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

const fetchEditUserData = async (data) => {
  const { _id, ...others } = data;
  const newData = {
    newUsername: others?.username,
    newEmail: others?.email,
    newName: others?.name,
    newSurname: others?.surname,
    newPassword: others?.password,
  };
  try {
    const response = await fetch(`${API_URL}/${_id}`, {
      method: "PUT",
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

export { fetchSingleUserData, fetchEditUserData };
