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
  status,
}: {
  title: string;
  user_id: string;
  list_id: string;
  status: string;
}) => {
  try {
    const response = await axios.post(`${URL}/createCard`, {
      title,
      user_id,
      list_id,
      status,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createChecklist = async ({
  task,
  user_id,
  card_id,
}: {
  task: string;
  user_id: string;
  card_id: string;
}) => {
  try {
    const response = await axios.post(`${URL}/createChecklist`, {
      task,
      user_id,
      card_id,
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

export const getCard = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/getInfoCard/${id}`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getChecklist = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/getInfoCard/${id}`);

    return response.data?.card_checklist;
  } catch (error) {
    return error;
  }
};

export const getTableList = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/getTableLists/${id}`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const putCardNewList = async ({ card_id, current_List, new_List }: { card_id: string; current_List: string; new_List: string; }) => {
  try {
    const response = await axios.put(`${URL}/putCardNewList`, { card_id, current_List, new_List });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const putChecklist = async ({
  status,
  checklist_id,
}: {
  status: string;
  checklist_id: string;
}) => {
  try {
    const response = await axios.put(`${URL}/putChecklist`, {
      status,
      checklist_id,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const putCardChecklist = async ({
  checklist,
  card_id,
}: {
  checklist: string;
  card_id: string;
}) => {
  try {
    const response = await axios.put(`${URL}/putCard`, {
      checklist,
      card_id,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const putCard = async ({
  card_id,
  title,
  description,
  label,
  dueDate,
  type,
  status,
}: {
  card_id: string;
  title: string;
  description: string;
  label: string;
  dueDate: string;
  type: string;
  status: string;
}) => {
  try {
    const response = await axios.put(`${URL}/putCard`, {
      card_id,
      title,
      description,
      label,
      dueDate,
      type,
      status,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
