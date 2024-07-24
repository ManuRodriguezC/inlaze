import Image from "next/image";
import CircularProgress from "./CircularProgress";
import Like from "@/app/icons/Like";
import Save from "@/app/icons/Save";
import styles from "@/app/styles/categories.module.css";
import { ReactNode, useEffect, useState } from "react";
import Loading from "./Loading";
import { getPopularMovies } from "@/app/api/moviesApi";
import NotFound from "./NotFound";

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
}

const setDate = (date: string | undefined): string => {
    if (!date) return "June 01, 2024";
    const months: Record<string, string> = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    };
    const [year, month, day] = date.split("-");
    return `${months[month]} ${year}, ${day}`;
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
              <li className={styles.movie} key={movie.id}>
                <Image
                  className={styles.image}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.overview}
                  width={180}
                  height={223}
                />
                <div className={styles.datas}>
                  <h3 className={styles.titleMovie}>{movie.title || movie.name}</h3>
                  <span className={styles.date}>
                    {movie.release_date ? setDate(movie.release_date) : setDate(movie.first_air_date)}
                  </span>
                  <div className={styles.ratings}>
                    <div className={styles.rating}>
                      <h5>Rating</h5>
                      <CircularProgress percentage={Math.floor(movie.vote_average * 10)} />
                    </div>
                    <div className={styles.rating}>
                      <h5>Favorites</h5>
                      <Like />
                    </div>
                    <div className={styles.rating}>
                      <h5>Save</h5>
                      <Save />
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <NotFound />
          )}
        </ul>
      )}
    </div>
  );
}
