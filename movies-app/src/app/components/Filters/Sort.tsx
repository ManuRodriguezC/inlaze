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

  return (
    <div>
      <div className={styles.filter}>
        <h2 className={`${styles.title} ${styles.empty}`}>{name}</h2>
        <Arrow />  
      </div>

      <div className={styles.listCategories}>
        
      </div>
  </div>
  )
}