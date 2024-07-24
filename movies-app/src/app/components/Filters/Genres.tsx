import { useState } from "react";
import styles from "@/app/styles/filters.module.css"
import Arrow from "@/app/icons/arrow";

export default function Genres() {
  const [name, setName] = useState("")

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mistery",
    "Romance",
    "Terror",
    "Zombis",
  ]

  const handleClick = (newName: string) => {
    setName(newName)
  }

  return (
    <div>
      <div className={styles.filter}>
        {name ?
          <h2 className={`${styles.title}`}>{name}</h2>
          :
          <h2 className={`${styles.title} ${styles.empty}`}>{name}</h2>
        }
        <Arrow />  
      </div>

      <div className={styles.listGenres}>
        {genres.map((gen, index) => (
          <button onClick={() => handleClick(gen)} className={styles.buttons} key={index}>{gen}</button>
        ))}
      </div>
  </div>
  )
}