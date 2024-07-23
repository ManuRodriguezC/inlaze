import styles from "@/app/styles/categories.module.css";
import RowMovies from "./RowMovies";
import Movies from "@/app/api/results.json"

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
  first_air_date? : string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
};   

type MoviesProps = {
  movies: Movie[]
}


export default function Categories({movies}: MoviesProps) {

  return (
    <div className={styles.categories}>
      <RowMovies movies={movies}>Popular</RowMovies>
      <RowMovies movies={movies}>Now Paying</RowMovies>
      <RowMovies movies={movies}>Upcoming</RowMovies>
      <RowMovies movies={movies}>Top Rated</RowMovies>
      <RowMovies movies={movies}>Favorites</RowMovies>
    </div>
  )
}