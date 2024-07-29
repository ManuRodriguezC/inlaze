import Logo from "@/app/icons/Logo"
import styles from "@/app/styles/header.module.css"
import LinkNav from "./Link"
import { listMovies } from "@/app/components/ListMoviesOptions"
import Link from "next/link"
import useStore from "@/app/store/store"

export default function Navbar() {
  const { login } = useStore()
  return (
    <nav>
      <ul className={styles.list}>
        <Link href={"/"}><LinkNav ><Logo /></LinkNav></Link>
        {listMovies.map((movie, index) => (
          <LinkNav key={`${movie.name}-${index}`} url={movie.url} name={movie.name}>{movie.name}</LinkNav>
          )
        )}
        {login&&<LinkNav >Favorites</LinkNav>}
        {login&&<LinkNav >Saved</LinkNav>}
      </ul>
    </nav>
  )
}