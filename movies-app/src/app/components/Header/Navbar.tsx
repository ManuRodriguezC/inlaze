import Logo from "@/app/icons/Logo"
import styles from "@/app/styles/header.module.css"
import Link from "./Link"
import { listMovies } from "@/app/components/ListMoviesOptions"

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.list}>
        <Link><Logo /></Link>
        {listMovies.map((movie, index) => (
          <Link key={`${movie.name}-${index}`} url={movie.url} name={movie.name}>{movie.name}</Link>
          )
        )}
        <Link>Favorites</Link>
        <Link>Saved</Link>
      </ul>
    </nav>
  )
}