const API_URL = "https://api.themoviedb.org/3/";

const fetchApi = async (pathname, query = "") => {
  try {
    const res = await fetch(
      `${API_URL}${pathname}?api_key=${process.env.API_KEY}&${query}`
    );
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const search = async (searchCom) => {
  return fetchApi("/search/multi", `query=${searchCom}`);
};
