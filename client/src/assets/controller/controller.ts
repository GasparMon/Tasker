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

export const createList = async ({
  name,
  table_id,
}: {
  name: string;
  table_id: string;
}) => {
  try {
    const response = await axios.post(`${URL}/createList`, {
      name,
      table_id,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createCard = async ({
  title,
  user_id,
  list_id,
}: {
  title: string;
  user_id: string;
  list_id: string;
}) => {
  try {
    const response = await axios.post(`${URL}/createCard`, {
      title,
      user_id,
      list_id,
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

export const GetIdBoard = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/getIdTable/${id}`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getListCard = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/getCard/${id}`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCard = async (id:string) => {
  try {
    const response = await axios.get(`${URL}/getInfoCard/${id}`);

    return response.data;
  } catch (error) {
    return error;
  }

}