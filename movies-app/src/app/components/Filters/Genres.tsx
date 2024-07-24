import { useEffect, useState } from "react";
import styles from "@/app/styles/filters.module.css"
import Arrow from "@/app/icons/arrow";
import { getPopularMovies } from "@/app/api/moviesApi";
import useStore from "@/app/store/store";

type Genres = {
  name: string;
  id: number;
}

export default function Genres() {
  const [name, setName] = useState("")
  const { filterMovies } = useStore()
  const [genres, setGenres] = useState<Genres[]>([]);

  const fetchGenres = async (url: string) => {
    try {
      const results = await getPopularMovies(url);
      setGenres(results.genres);
    } catch (err) {
      setGenres([]);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres('https://api.themoviedb.org/3/genre/movie/list');
  }, []);

  const handleClick = (newName: string, idGenres: number, genName: string) => {
    setName(newName)
    filterMovies(idGenres)
  }

  return (
    <div>
      <div className={styles.filter}>
        {name ?
          <h2 className={`${styles.title}`}>{name}</h2>
          :
          <h2 className={`${styles.title} ${styles.empty}`}>{name}</h2>
        }
        <Arrow />  
      </div>

      <div className={styles.listGenres}>
        {genres.map((gen, index) => (
          <button onClick={() => handleClick(gen.name, gen.id, gen.name)} className={styles.buttons} key={index}>{gen.name}</button>
        ))}
      </div>
  </div>
  )
}