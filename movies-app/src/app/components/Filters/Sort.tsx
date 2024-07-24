import { useState } from "react";
import styles from "@/app/styles/filters.module.css"
import Arrow from "@/app/icons/arrow";

export default function Sort() {
  const [selectedSort, setSelectedSort] = useState("Action")
  const [name, setName] = useState("")

  const sorters = [
    "Categories",
    "Title A-Z",
    "Popularity Ascending",
    "Popularity Descendign",
    "Rating Ascending",
    "Rating Descending",
    "Release Date Ascending",
    "Release Date Descending",
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

      <div className={styles.listCategories}>
        {sorters.map((sort, index) => (
          <button onClick={() => handleClick(sort)} className={styles.buttons} key={index}>{sort}</button>
        ))}
      </div>
  </div>
  )
}