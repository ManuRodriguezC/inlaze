import { ReactNode } from "react";
import styles from "@/app/styles/header.module.css"
import { getPopularMovies } from "@/app/api/moviesApi";
import useStore from "@/app/store/store";

type LinkProps = {
  children: ReactNode;
  url?: string;
  name?: string;
};

export default function Link({ children, url, name = "" }: LinkProps) {

  const { cleanMovies, updateMovies, updateNameList, movies } = useStore()

  const handleClickStore = (url?: string, name?: string) => {
    const fetchMovies = async (url: string) => {
      try {
        const results = await getPopularMovies(url);
        updateMovies(results.results)
        if (name) {
          updateNameList(name)
        }
        console.log(movies)
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
      }
    };
    if (url) {
      fetchMovies(url)
    } else {
      cleanMovies()
    }
  }

  return (
    <li onClick={() => handleClickStore(url, name)} className={styles.link}>{children}</li>
  );
}
