import axios from "axios";

const URL = import.meta.env.VITE_URL_HOST;

export const createBoard = async ({
  name,
  image,
  user_id,
}: {
  name: string;
  image: string;
  user_id: string;
}) => {
  try {
    const response = await axios.post(`${URL}/createTable`, {
      name,
      image,
      user_id,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUser = async (email: string) => {
  try {
    const response = await axios.get(`${URL}/getUser/${email}`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getBoard = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/getTable/${id}`);

    return response.data;
    
  } catch (error) {
    return error;
  }
};
