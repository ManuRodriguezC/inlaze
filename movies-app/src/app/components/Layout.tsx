'use client'


import styles from "@/app/styles/page.module.css";
import Header from "./Header/Header";
import Filter from "./Filters/Filter";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export default function Home({children}: Props) {

  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.section}>
        <Filter />
        {children}
      </section>
    </main>
  );
}
