import styles from "@/app/styles/header.module.css"
import Link from "./Link"
import Sun from "@/app/icons/Sun"
import SignIn from "@/app/icons/SignIn"

export default function Options() {
  return (
    <nav>
      <ul className={`${styles.list} ${styles.options}`}>
        <Link href="#"><Sun /></Link>
        <Link href="#"><SignIn /></Link>
      </ul>
    </nav>
  )
}