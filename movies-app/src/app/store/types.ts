// types.ts
export interface Movie {
    backdrop_path: string;
    id: number;
    title?: string;
    name?: string;
    original_title?: string;
    overview: string;
    poster_path: string;
    media_type: string;
    adult: boolean;
    original_language: string;
    first_air_date?: string;
    genre_ids: number[];
    popularity: number;
    release_date?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
    origin_country?: string[];
};
  
  export interface StoreState {
    movies: Movie[];
    listFilterMovies: Movie[];
    nameList: string;
    nameFilter: string;
    updateNameList: (newName: string) => void;
    updateMovies: (setMovies: Movie[]) => void;
    filterMovies: (idGenge: number) => void;
    sortMovies: (typeSort: string) => void;
    cleanMovies: () => void;
    cleanName: () => void;
    cleanFilterMovies: () => void;
  }
  