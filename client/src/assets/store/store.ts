import create from "zustand";

interface OptionsState {
  board: boolean;
  bookmark: boolean;
  team: boolean;
  task: boolean;
  setOption: (element: keyof OptionsState) => void;
}

interface CreateBoard {
  createBoard: boolean;
  setModal: () => void;
}

interface CreateCard {
  createCard: boolean;
  id: string;
  setModal: (id: string) => void;
}

interface CreateUser {
  createUser: boolean;
  id: string;
  setModalUser: (id: string) => void;
}

interface DeleteList {
  deleteList: boolean;
  listId: string;
  setModalList: (listId: string) => void;
}

interface DeleteBoard {
  deleteBoard: boolean;
  boardId: string;
  setModalBoard: (boardId: string) => void;
}

interface Notification {
  notification: boolean;
  setModalNotification: () => void;
}

interface SetBoard {
  id: string;
  setBoardFunction: (id: string) => void;
}

interface List {
  list_id: string;
  setList: (list_id: string) => void;
}

interface CardSetting {
  status: string;
  type: string;
  label: string;
  date: string;
  checklist: string;
  workers: any[];
  resetModal: () => void;
  postModal: ({
    status,
    type,
    label,
    date,
    checklist,
    workers,
  }: {
    status: string;
    type: string;
    label: string;
    date: string;
    checklist: string;
    workers: any[];
  }) => void;
  setModal: (name: string, value: any) => void;
  addModal: (id: string) => void;
}

interface CheckBox {
  status: boolean;
  setBox: () => void;
}

interface update {
  update: boolean;
  setUpdate: () => void;
}

interface ChatRoom {
  chatRoom: boolean;
  userId: string;
  IdRoom: string;
  email: string;
  socket: any;
  setOpenRoom: () => void,
  setRoom: ({
    socket,
    userId,
    IdRoom,
    email,
  }: {
    socket: any;
    userId: string;
    IdRoom: string;
    email: string;
  }) => void;
}

interface Message {
  message: any;
  setMessage: (data: any) => void;
}

interface ChatConnection {
  connection: boolean;
  users: any[];
  setUserIn:(id:string, room:string) => void;
  setUserOut:(id:string) => void;
}

export const useOptionsHome = create<OptionsState>((set) => ({
  board: true,
  bookmark: false,
  team: false,
  task: false,
  setOption: (element: keyof OptionsState) =>
    set((state) => ({
      ...state,
      board: false,
      bookmark: false,
      team: false,
      task: false,
      [element]: true,
    })),
}));

export const useModalBoard = create<CreateBoard>((set) => ({
  createBoard: false,
  setModal: () =>
    set((state) => ({
      ...state,
      createBoard: !state.createBoard,
    })),
}));

export const useModalNotification = create<Notification>((set) => ({
  notification: false,
  setModalNotification: () =>
    set((state) => ({
      ...state,
      notification: !state.notification,
    })),
}));

export const useModalUser = create<CreateUser>((set) => ({
  createUser: false,
  id: "",
  setModalUser: (id) =>
    set((state) => ({
      ...state,
      id: id,
      createUser: !state.createUser,
    })),
}));

export const useModalList = create<DeleteList>((set) => ({
  deleteList: false,
  listId: "",
  setModalList: (listId) =>
    set((state) => ({
      ...state,
      listId: listId,
      deleteList: !state.deleteList,
    })),
}));

export const useModalDeleteBoard = create<DeleteBoard>((set) => ({
  deleteBoard: false,
  boardId: "",
  setModalBoard: (boardId: string) =>
    set((state) => ({
      ...state,
      boardId: boardId,
      deleteBoard: !state.deleteBoard,
    })),
}));

export const useCheckBox = create<CheckBox>((set) => ({
  status: true,
  setBox: () =>
    set((state) => ({
      ...state,
      status: !state.status,
    })),
}));

export const useUpdate = create<update>((set) => ({
  update: true,
  setUpdate: () =>
    set((state) => ({
      ...state,
      update: !state.update,
    })),
}));

export const useModalCard = create<CreateCard>((set) => ({
  createCard: false,
  id: "",
  setModal: (id) =>
    set((state) => ({
      ...state,
      id: id,
      createCard: !state.createCard,
    })),
}));

export const ListCard = create<List>((set) => ({
  list_id: "",
  setList: (id) =>
    set((state) => ({
      ...state,
      list_id: id,
    })),
}));

export const useBoardState = create<SetBoard>((set) => ({
  id: "",
  setBoardFunction: (id) =>
    set((state) => ({
      ...state,
      id: id,
    })),
}));

export const useSettingCard = create<CardSetting>((set) => ({
  status: "",
  type: "",
  label: "",
  date: "",
  checklist: "",
  workers: [],
  resetModal: () =>
    set((state) => ({
      ...state,
      status: "",
      type: "",
      label: "",
      date: "",
      checklist: "",
      workers: [],
    })),

  postModal: ({ status, type, label, date, checklist, workers }) =>
    set((state) => ({
      ...state,
      status: status,
      label: label,
      type: type,
      date: date,
      checklist: checklist,
      workers: workers,
    })),

  setModal: (name, value) =>
    set((state) => ({
      ...state,
      [name]: value,
    })),
  addModal: (id) =>
    set((state) => {
      if (state.workers.includes(id)) {
        state.workers = state.workers.filter((element) => element !== id);
      } else {
        state.workers.push(id);
      }
      return {
        ...state,
        workers: [...state.workers],
      };
    }),
}));

///chat Room

export const useModalChat = create<ChatRoom>((set) => ({
  chatRoom: false,
  userId: "",
  IdRoom: "",
  email: "",
  socket: {},
  setOpenRoom: () =>
  set((state) => ({
    ...state,
    chatRoom: !state.chatRoom,
  })),
  setRoom: ({ socket, userId, IdRoom, email }) =>
    set((state) => ({
      ...state,
      socket: socket,
      userId: userId,
      IdRoom: IdRoom,
      email: email,
    })),
}));

export const useMessage = create<Message>((set) => ({
  message: {},
  setMessage: (message) => set((state) => ({ ...state, message })),
}));

export const useChatConnection = create<ChatConnection>((set) => ({
  connection: false,
  users: [],
  setUserIn: (id, room) => set((state) => ({
    ...state,
    users: [...state.users, {id, room}],
    connection: true,
  })),
  setUserOut: (id) => set((state) => ({
    ...state,
    users: state.users.filter((element) => element.id !== id),
    connection: false,
  }))
  
}));