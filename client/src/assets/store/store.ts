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