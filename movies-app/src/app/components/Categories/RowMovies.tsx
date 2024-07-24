'use client';

import { ReactNode, useEffect, useState } from "react";
import styles from "@/app/styles/categories.module.css";
import Loading from "./Loading";
import { getPopularMovies } from "@/app/api/moviesApi";
import NotFound from "./NotFound";
import MovieItem from "./Poster" // Importa el nuevo componente

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
  url: string;
};

export default function RowMovies({ children, url }: MoviesProps) {
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
      console.error('Error fetching movies:', err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(url);
  }, [url]);

  return (
    <div className={styles.categories}>
      <h2 className={styles.titleFilters}>{children}</h2>
      {loading ? (
        <Loading />
      ) : (
        <ul className={styles.listMovies}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))
          ) : (
            <NotFound />
          )}
        </ul>
      )}
    </div>
  );
}
