import styles from "@/app/styles/loading.module.css"

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
      <div className={styles.block}></div>
    </div>
  )
}