import Image from "next/image";
import CircularProgress from "./CircularProgress";
import Like from "@/app/icons/Like";
import Save from "@/app/icons/Save";
import styles from "@/app/styles/categories.module.css";
import { ReactNode } from "react";

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
    children: ReactNode;
    movies: Movie[];
  }

function setDate(date: string | undefined):string {
    if (!date) return "June 01, 2024"
    const months: Record<string, string> = {
      '01': 'Jan',
      '02': 'feb',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'Sept',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dic'
    }
  
    const [day, month, year] = date?.split("-");
    const setDate = `${months[month]} ${year}, ${day}`;
    return setDate
  }

export default function RowMovies({children, movies}: MoviesProps) {
    return (
        <div className={styles.categories}>
          <h2 className={styles.titleFilters}>{children}</h2>
          <ul className={styles.listMovies}>
            {movies.map(movie => (
              <li className={styles.movie} key={movie.id}>
                <Image className={styles.image} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.overview} width={180} height={223}/>
                <div className={styles.datas}>
                  <h3 className={styles.titleMovie}>{movie.title ? movie.title : movie.name}</h3>
                  <span className={styles.date}>{movie.release_date ? setDate(movie.release_date) : setDate(movie.first_air_date)}</span>
                  <div className={styles.ratings}>
                    <div className={styles.rating}>
                      <h5>Rating</h5>
                      <CircularProgress percentage={Math.floor(movie.vote_average * 10)}/>
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
            ))}
          </ul>
        </div>
      )
}