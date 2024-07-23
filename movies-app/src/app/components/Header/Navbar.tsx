import Logo from "@/app/icons/Logo"
import styles from "@/app/styles/header.module.css"
import Link from "./Link"

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.list}>
        <Link href="#"><Logo /></Link>
        <Link href="#">Popular</Link>
        <Link href="#">Now Playing</Link>
        <Link href="#">Upcoming</Link>
        <Link href="#">Top Rated</Link>
        <Link href="#">Favorites</Link>
        <Link href="#">Saved</Link>
      </ul>
    </nav>
  )
}