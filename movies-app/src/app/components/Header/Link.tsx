import { ReactNode } from "react";
import styles from "@/app/styles/header.module.css"
import { getPopularMovies } from "@/app/api/moviesApi";
import useStore from "@/app/store/store";
import { usePathname } from "next/dist/client/components/navigation";
import { useRouter } from "next/navigation";

type LinkProps = {
  children: ReactNode;
  url?: string;
  name?: string;
};

export default function LinkNav({ children, url, name = ""}: LinkProps) {

  const pathname = usePathname()
  const router = useRouter()
  const { cleanMovies, cleanFilterMovies,  updateMovies, updateNameList, movies } = useStore()

  const handleClickStore = (url?: string, name?: string) => {
    const fetchMovies = async (url: string) => {
      try {
        const results = await getPopularMovies(url);
        updateMovies(results.results)
        cleanFilterMovies()
        if (name) {
          updateNameList(name)
        }
        if (pathname != "/") {
          router.push('/')
        }
      } catch (err) {
        console.error('Error fetching movies:', err);
      } 
    };
    if (url) {
      fetchMovies(url)
    } else {
      cleanMovies()
      cleanFilterMovies()
    }
  }

  return (
      <li onClick={() => handleClickStore(url, name)} className={styles.link}>{children}</li>
  );
}
