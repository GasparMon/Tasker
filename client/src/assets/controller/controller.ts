import axios from "axios";

const URL = import.meta.env.VITE_URL_HOST;

export const getUser = async (email: string) => {
  try {
    const response = await axios.get(`${URL}/getUser/${email}`);

    return response.data;
  } catch (error) {
    return error;
  }
};
