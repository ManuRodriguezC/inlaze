import { GetServerSideProps } from 'next';
import Header from '@/app/components/Header/Header';
import { useEffect, useState } from 'react';
import { getPopularMovies } from '@/app/api/moviesApi';
import styles from "@/app/styles/movie.module.css"
import Image from 'next/image';
import CircularProgress from '@/app/components/Categories/CircularProgress';
import Link from 'next/link';
import Back from '@/app/icons/Back';
import Loading from '@/app/components/Categories/Loading';
import { Movie, MoviePageProps, Person, Review } from '@/app/components/Types';
import Play from '@/app/icons/Play';
import { fetchMovies } from '@/app/api/fechtMovies';



const setDate = (date: string | undefined): string => {
  if (!date) return "June 01, 2024";
  const months: Record<string, string> = {
    '01': 'January',
    '02': 'Febrary',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  };
  const [year, month, day] = date.split("-");
  return `${months[month]} ${day}, ${year}.`;
};

const setTime = (time: number | undefined): string => {
  if (!time) return "2h 15min."
  const hours = Math.floor(time / 60)
  const minutes = time % 60
  return `${hours}h ${minutes}min.`
}

export default function MoviePage({ id }: MoviePageProps) {
  const [movie, setMovie] = useState<Movie>()
  const [cast, setCast] = useState<Person[]>([])
  const [summary, setSummary] = useState<Review>()
  const [recomment, setRecomment] = useState([])

  useEffect(() => {
    const urlMovie = `https://api.themoviedb.org/3/movie/${id}`
    const urlCast = `https://api.themoviedb.org/3/movie/${id}/credits`
    const urlSummary = `https://api.themoviedb.org/3/movie/${id}/reviews`
    const urlRecomment = `https://api.themoviedb.org/3/movie/${id}/similar`

    const fetchAndSetMovies = async () => {
      const results = await fetchMovies(urlMovie);
      const resultCast = await fetchMovies(urlCast);
      const resultSummary = await fetchMovies(urlSummary);
      const resultRecomment = await fetchMovies(urlRecomment)
      if (results) {
        setMovie(results);
      }
      if (resultCast && resultCast.cast) {
        setCast(resultCast.cast);
      } else {
        setCast([])
      }
      if (resultSummary) {
        setSummary(resultSummary.results[0] || null)
      }
      if (resultRecomment && resultRecomment.results) {
        setRecomment(resultRecomment.results)
      }
    };

    fetchAndSetMovies();
  }, [id]);

  return (
    <main className={styles.main}>
    <Header />
    {movie ? 
    <section className={styles.sectionMovie}>
      <Link className={styles.back} href={"/"}><Back /></Link>
      <section className={styles.banner}>
        <Image
            className={styles.image}
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.overview}
            fill
            sizes="100vw"
            />
      <section className={styles.datas}>

        <div className={styles.contentPoster}>
            <Image
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.overview}
              width={305}
              height={395}
              />
              <button className={styles.play}>Official Trailer
                <Play />
              </button>
          </div>

          <div className={styles.contentInfo}>
            <h3 className={styles.titleMovie}>{movie.title}</h3>
            <div className={styles.dates}>
              <span className={styles.date}>
                {setDate(movie.release_date)}
              </span>
              <span className={styles.date}>
                {setTime(movie.runtime)}
              </span>
            </div>
            <p className={styles.overview}>Overview:</p>
            <p className={styles.overviewText}>{movie.overview}</p>
            <div className={styles.score}>
              <CircularProgress radius={40} stroke={3} fontSize={23} percentage={Math.floor(movie.vote_average * 10)} />
              <p>Users Score</p>
            </div>
            <div className={styles.genres}>
              {movie.genres.map(mov => (
                <p key={mov.name}>{mov.name}</p>
              ))}
            </div>
          </div>
        </section>
      
      </section>

      <section className={styles.info}>
        <div className={styles.cast}>
          <h3 className={styles.titleInformation}>Cast</h3>
          <div className={styles.listCast}>
            {cast.slice(0, 6).map(cas => (
              <div key={cas.id}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${cas.profile_path}`}
                  alt={movie.overview}
                  width={110}
                  height={140}
                  />
                  <p className={styles.name}>{cas.name} <span>as {cas.character}</span></p>
              </div>
            ))}
          </div>
          <div>
            <h3 className={styles.titleInformation}>Plot Summary</h3>
            <p className={styles.summary}>
              {summary ? summary.content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."}
              </p>
          </div>
        </div>

        <div className={styles.description}>
          <div>
            <p>Director:</p>
            <span>
              {movie.production_companies && movie.production_companies.length > 0 
                ? movie.production_companies[0].name || "Study Company S.A"
                : "Study Company S.A"}
            </span>

          </div>
          <div>
            <p>Producer:</p>
            <span>
              {movie.production_companies.map(mov => mov.name).join()}
            </span>
          </div>
          <div>
            <p>Screenplay:</p>
            <span>
              {movie.production_countries.map(mov => mov.name).join()}
            </span>
          </div>
          <div>
            <p>Genre:</p>
            <span>
              {movie.genres.map(mov => mov.name).join()}
            </span>
          </div>
          <div>
            <p>Budget:</p>
            <span>Estimated Budget: ${movie.runtime} millon</span>
          </div>
          <div>
            <p>Original Languages:</p>
            <span>
              {movie.spoken_languages && movie.spoken_languages.length > 0 
                ? movie.spoken_languages[0].english_name || "Study Company S.A"
                : "Study Company S.A"}
            </span>
          </div>
          <div>
            <p>Status:</p>
            <span>{movie.status}</span>
          </div>
        </div>
      </section>
      <section className={styles.recomment}>
        <h3 className={styles.titlerecomment}>Recommendations</h3>
        <div className={styles.listRecomment}>
          {recomment.length > 0 && recomment.slice(0, 6).map((recom: any) => (
            <Link key={`posterRecomment${recom.id}`} href={`/movie/${recom.id}`} className={styles.posterRecomment}>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${recom.poster_path}`}
                    alt={movie.overview}
                    width={200}
                    height={253}
                    className={styles.imageRecomment}
                    />
                <p> 
                  {recom.original_title}
                </p>
            </Link>
          ))}
        </div>
      </section>
    </section>
    :
    <div className={styles.loadingMovie}>
      <Loading />
    </div>
    } 
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { idmovie } = context.params as { idmovie: string };

  return {
    props: {
      id: idmovie
    }
  };
};
