import { create } from 'zustand';
import { Movie, StoreState } from './types';

const useStore = create<StoreState>((set) => ({
  movies: [],
  nameList: "",
  updateNameList: (newName: string) => set(() => ({
    nameList: newName,
  })),
  updateMovies: (setMovies: Movie[]) => set(() => ({
    movies: setMovies,
  })),
  cleanMovies: () => set(() => ({
    movies: [],
  })),
  cleanName: () => set(() => ({
    nameList: ""
  }))
}));

export default useStore;
