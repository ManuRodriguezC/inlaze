'use client'


import styles from "@/app/styles/page.module.css";
import Header from "./components/Header/Header";
import Filter from "./components/Filters/Filter";
import Categories from "./components/Categories/Categories";
import Banner from "./components/MainBanner/Banner";

export default function Home() {

  return (
    <main className={styles.main}>
      <Header />
      <Banner />
      <section className={styles.section}>
        <Filter />
        <Categories />
      </section>
    </main>
  );
}
