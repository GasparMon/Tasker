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

interface SetBoard {
  id: string;
  setBoardFunction: (id: string) => void;
}

interface List{
  list_id: string,
  setList: (list_id: string) => void
}

interface CardSetting {
  status: string;
  type: string;
  label: string;
  date: string;
  checklist: string;
  workers: string[];
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
    workers: string[];
  }) => void;
  setModal: (name: string, value: any) => void;
  addModal: (id: string) => void;
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

export const ListCard = create <List> ((set) => ({
  list_id: "",
  setList:(id) => set((state) =>({
    ...state,
    list_id: id
  })),
}))

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
