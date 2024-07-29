import styles from "@/app/styles/header.module.css"
import Link from "./Link"
import Sun from "@/app/icons/Sun"
import SignIn from "@/app/icons/SignIn"
import useStore from "@/app/store/store"
import Close from "@/app/icons/CloseSession"

export default function Options() {

  const { updateLoginPage, login, username, updateUsername, closeSesion } = useStore()

  return (
    <nav>
      <ul className={`${styles.list} ${styles.options}`}>
        {login&&<span>{username}</span>}
        <Link><Sun /></Link>
        {
          login
          ?
          <button onClick={closeSesion} className={styles.close}>
            <Close />
          </button>
          :
          <button onClick={updateLoginPage} className={styles.sing}>
            <SignIn />
          </button>
        }
      </ul>
    </nav>
  )
}