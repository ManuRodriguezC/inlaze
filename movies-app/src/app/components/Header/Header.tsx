import Navbar from "./Navbar";
import styles from "../../styles/header.module.css"
import Options from "./Options";

export default function Header() {
  return (
    <header className={styles.header}>
      <Navbar />
      <Options />
    </header>
  )
}