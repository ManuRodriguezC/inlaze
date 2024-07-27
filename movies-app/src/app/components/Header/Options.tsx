import styles from "@/app/styles/header.module.css"
import Link from "./Link"
import Sun from "@/app/icons/Sun"
import SignIn from "@/app/icons/SignIn"
import useStore from "@/app/store/store"

export default function Options() {

  const { updateLoginPage, loginPage } = useStore()

  return (
    <nav>
      <ul className={`${styles.list} ${styles.options}`}>
        <Link><Sun /></Link>
        <button onClick={updateLoginPage} className={styles.sing}>
          <SignIn />
        </button>
      </ul>
    </nav>
  )
}