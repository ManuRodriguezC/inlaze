import { create } from 'zustand';
import { Movie, StoreState } from './types';

const useStore = create<StoreState>((set) => ({
  movies: [],
  listFilterMovies: [],
  nameList: "",
  nameFilter: "",
  updateNameList: (newName: string) => set(() => ({
    nameList: newName,
  })),
  updateMovies: (setMovies: Movie[]) => set(() => ({
    movies: setMovies,
  })),
  filterMovies: (idGenre: number) => set((state) => ({
    listFilterMovies: state.movies.filter((movie) => movie.genre_ids.includes(idGenre))
  })),
  sortMovies: (typeSort: string) => set((state) => {
    const moviesToSort = state.listFilterMovies.length > 0 ? state.listFilterMovies : state.movies;
    const sortedMovies = [...moviesToSort];
    if (typeSort === "Categories") {
      sortedMovies.sort((a, b) => {
        const genreA = a.genre_ids[0] || 0;
        const genreB = b.genre_ids[0] || 0;
        return genreA - genreB;
      });
    } else if (typeSort === "Title A-Z") {
      sortedMovies.sort((a, b) => {
        const titleA = (a.title || a.name || "").trim().toLowerCase();
        const titleB = (b.title || b.name || "").trim().toLowerCase();
        return titleA.localeCompare(titleB, 'en', { sensitivity: 'base' });
      });
    } else if (typeSort === "Popularity Ascending") {
      sortedMovies.sort((a, b) => {
        return b.popularity - a.popularity;
      });
    } else if (typeSort === "Popularity Descendign") {
      sortedMovies.sort((a, b) => {
        return a.popularity - b.popularity;
      });
    } else if (typeSort === "Rating Ascending") {
      sortedMovies.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
    } else if (typeSort === "Rating Descending") {
      sortedMovies.sort((a, b) => {
        return a.vote_average - b.vote_average;
      });
    } else if (typeSort === "Release Date Ascending") {
      sortedMovies.sort((a, b) => {
        const dateA = a.release_date ? Date.parse(a.release_date) : 0;
        const dateB = b.release_date ? Date.parse(b.release_date) : 0;
        return dateB - dateA;
      });
    } else if (typeSort === "Release Date Descending") {
      sortedMovies.sort((a, b) => {
        const dateA = a.release_date ? Date.parse(a.release_date) : 0;
        const dateB = b.release_date ? Date.parse(b.release_date) : 0;
        return dateA - dateB;
      });
    }
    return { movies: sortedMovies };
  }),
  cleanMovies: () => set(() => ({
    movies: [],
  })),
  cleanName: () => set(() => ({
    nameList: ""
  })),
  cleanFilterMovies: () => set(() => ({
    listFilterMovies: []
  }))
}));

export default useStore;
