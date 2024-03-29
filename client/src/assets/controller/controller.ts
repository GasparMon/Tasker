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

export const createNotification = async ({
  board_id,
  sender_id,
  email,
}: {
  board_id: string;
  sender_id: string;
  email: string;
}) => {
  try {
    const response = await axios.post(`${URL}/creatNotification`, {
      board_id,
      sender_id,
      email,
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

export const getTeamBoard = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/getTableTeam/${id}`);

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

export const getNotifications = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/getNotifications/${id}`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const putCardNewList = async ({
  card_id,
  current_List,
  new_List,
}: {
  card_id: string;
  current_List: string;
  new_List: string;
}) => {
  try {
    const response = await axios.put(`${URL}/putCardNewList`, {
      card_id,
      current_List,
      new_List,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateNotifications = async (id: string) => {
  try {
    const response = await axios.put(`${URL}/updateNotifications/${id}`);

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

export const putChecklistInfo = async ({
  task,
  checklist_id,
}: {
  task: string;
  checklist_id: string;
}) => {
  try {
    const response = await axios.put(`${URL}/putChecklist`, {
      task,
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

export const putNotification = async ({
  notification_id,
  sender_id,
  reciever_id,
  response,
}: {
  notification_id: string;
  sender_id: string;
  reciever_id: string;
  response: string;
}) => {
  try {
    const respons = await axios.put(`${URL}/putNotification`, {
      notification_id,
      sender_id,
      reciever_id,
      response,
    });

    return respons.data;
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
  workers,
}: {
  card_id: string;
  title: string;
  description: string;
  label: string;
  dueDate: string;
  type: string;
  workers: any[];
}) => {
  try {
    const response = await axios.put(`${URL}/putCard`, {
      card_id,
      title,
      description,
      label,
      dueDate,
      type,
      workers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const addUserTeam = async ({
  email,
  table_id,
}: {
  email: string;
  table_id: string;
}) => {
  try {
    const response = await axios.put(`${URL}/addUser`, {
      email,
      table_id,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const addUserPending = async ({
  email,
  table_id,
}: {
  email: string;
  table_id: string;
}) => {
  try {
    const response = await axios.put(`${URL}/addUserPending`, {
      email,
      table_id,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const putUserTeamResponse = async ({
  board_id,
  user_id,
  response,
}: {
  board_id: string;
  user_id: string;
  response: string;
}) => {
  try {
    const respons = await axios.put(`${URL}/putUserTeamResponse`, {
      board_id,
      user_id,
      response,
    });

    return respons.data;
  } catch (error) {
    return error;
  }
};

export const addNewUserBoard = async ({
  table_id,
  user_id,
}: {
  table_id: string;
  user_id: string;
}) => {
  try {
    const response = await axios.put(`${URL}/addNewUserBoard`, {
      table_id,
      user_id,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeCheck = async ({
  card_id,
  check_id,
}: {
  card_id: string;
  check_id: string;
}) => {
  try {
    const response = await axios.delete(`${URL}/removeCheck`, {
      data: { card_id, check_id },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeCard = async ({
  card_id,
  list_id,
}: {
  card_id: string;
  list_id: string;
}) => {
  try {
    const response = await axios.delete(`${URL}/removeCard`, {
      data: { card_id, list_id },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeUserTeam = async ({
  table_id,
  user_id,
}: {
  table_id: string;
  user_id: string;
}) => {
  try {
    const response = await axios.delete(`${URL}/removeUserTeam`, {
      data: { table_id, user_id },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeList = async ({
  table_id,
  list_id,
}: {
  table_id: string;
  list_id: string;
}) => {
  try {
    const response = await axios.delete(`${URL}/removeList`, {
      data: { table_id, list_id },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeTable = async ({ table_id }: { table_id: string }) => {
  try {
    const response = await axios.delete(`${URL}/removeTable`, {
      data: { table_id },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

// chat controllers //

export const addConnection = async ({
  user_id,
  connection,
  table_id,
}: {
  user_id: string;
  connection: boolean;
  table_id: string;
}) => {
  try {
    const response = await axios.put(`${URL}/addConnection`, {
      user_id,
      connection,
      table_id,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};


export const createMessage = async ({
  body, date, table_id, user_id 
}: {
  body: string, date: string, table_id: string, user_id: string 
}) => {
  try {
    const response = await axios.post(`${URL}/createMessage`, {
      body, date, table_id, user_id 
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMessage = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/getMessages/${id}`);

    return response.data;
  } catch (error) {
    return error;
  }
};