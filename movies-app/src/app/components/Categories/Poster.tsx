import Image from "next/image";
import CircularProgress from "./CircularProgress";
import Like from "@/app/icons/Like";
import Save from "@/app/icons/Save";
import styles from "@/app/styles/categories.module.css";
import Link from "next/link";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
};

type MovieItemProps = {
  movie: Movie;
};

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

export default function MovieItem({ movie }: MovieItemProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
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
    </Link>
  );
}
