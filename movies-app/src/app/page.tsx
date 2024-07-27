'use client'


import styles from "@/app/styles/page.module.css";
import Header from "./components/Header/Header";
import Filter from "./components/Filters/Filter";
import Categories from "./components/Categories/Categories";
import Banner from "./components/MainBanner/Banner";
import Login from "./components/Login/Login";
import useStore from "./store/store";

export default function Home() {

  const { loginPage } = useStore()

  return (
    <main className={styles.main}>
      <Header />
      <Banner />
      {loginPage&&<Login />}
      <section className={styles.section}>
        <Filter />
        <Categories />
      </section>
    </main>
  );
}
