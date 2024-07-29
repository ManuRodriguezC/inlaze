'use client';

import { ReactNode, useEffect, useState } from "react";
import styles from "@/app/styles/categories.module.css";
import Loading from "./Loading";
import { getPopularMovies } from "@/app/api/moviesApi";
import NotFound from "./NotFound";
import MovieItem from "./Poster"; // Importa el nuevo componente
import { MovieList } from "../Types";

type Movie = {
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

type MoviesProps = {
  children: ReactNode;
  url?: string;
  listMovies?: MovieList[];
};

export default function RowMovies({ children, url, listMovies }: MoviesProps) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async (url: string) => {
    try {
      const results = await getPopularMovies(url);
      if (results && results.results) {
        setMovies(results.results);
      } else {
        setMovies([]);
      }
    } catch (err) {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (listMovies) {
      console.log(listMovies)
    }
    if (url && !listMovies) {
      fetchMovies(url);
    } else {
      setLoading(false);
    }
  }, [url, listMovies]);

  type CommonMovie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  };

  const adaptMovies = (movies: Movie[]): CommonMovie[] => {
    return movies.map(movie => ({
      id: movie.id,
      title: movie.title || movie.name || "Not fount",
      release_date: movie.release_date || movie.first_air_date || "2024-02-19",
      overview: movie.overview,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    }));
  };
  
  const adaptListMovies = (listMovies: MovieList[]): CommonMovie[] => {
    return listMovies.map(movie => ({
      id: movie.id_movie,
      title: movie.title || movie.name || "Not found",
      overview: movie.overview,
      poster_path: movie.poster_path,
      release_date: movie.release_date || "2022-12-13",
      vote_average: movie.vote_average,
    }));
  };

  const displayMovies = listMovies ? adaptListMovies(listMovies) : adaptMovies(movies)

  return (
    <div className={styles.categories}>
      <h2 className={styles.titleFilters}>{children}</h2>
      {loading ? (
        <Loading />
      ) : (
        <ul className={styles.listMovies}>
          {
            displayMovies.length > 0 ? 
            displayMovies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            )) : 
            <NotFound />
          }
        </ul>
      )}
    </div>
  );
}
