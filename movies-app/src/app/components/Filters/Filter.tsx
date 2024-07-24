import Search from "@/app/icons/Search";
import styles from "@/app/styles/filters.module.css";
import Sort from "./Sort";
import Genres from "./Genres";


export default function Filter() {
  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>Search</h2>
      <form className={styles.form}>
        <input placeholder="Keywords" type="text">
        </input>
        <button type="submit"><Search /></button>
      </form>
      <h2 className={styles.title}>Sort By</h2>
      <Sort />
      <h2 className={styles.titleGenres}>Genres</h2>
      <Genres />
    </div>
  )
}