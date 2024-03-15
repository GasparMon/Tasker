import create from "zustand";

interface OptionsState {
  board: boolean;
  bookmark: boolean;
  team: boolean;
  task: boolean;
  setOption: (element: keyof OptionsState) => void;
}

interface CreateBoard {
  createBoard: boolean,
  setModal:() => void;
}

interface CreateCard {
  createCard: boolean,
  id: string,
  setModal:(id: string) => void;
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
      createBoard: !state.createBoard 
    }))
}));

export const useModalCard = create<CreateCard>((set) => ({
  createCard: false,
  id:"",
  setModal: (id) =>
    set((state) => ({
      ...state,
      id: id,
      createCard: !state.createCard
    }))
}));