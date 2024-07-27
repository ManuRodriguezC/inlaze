import Logo from "@/app/icons/Logo"
import styles from "@/app/styles/header.module.css"
import LinkNav from "./Link"
import { listMovies } from "@/app/components/ListMoviesOptions"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.list}>
        <Link href={"/"}><LinkNav ><Logo /></LinkNav></Link>
        {listMovies.map((movie, index) => (
          <LinkNav key={`${movie.name}-${index}`} url={movie.url} name={movie.name}>{movie.name}</LinkNav>
          )
        )}
        <LinkNav >Favorites</LinkNav>
        <LinkNav >Saved</LinkNav>
      </ul>
    </nav>
  )
}