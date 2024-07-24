'use client';

import styles from "@/app/styles/categories.module.css";
import RowMovies from "./RowMovies";
import { listMovies } from "../ListMoviesOptions";
import useStore from "@/app/store/store";
import { useEffect } from "react";
import MovieItem from "./Poster";

export default function Categories() {

  const { movies, listFilterMovies, nameList } = useStore()
  const list = listFilterMovies.length > 0 ? listFilterMovies : movies
  useEffect(() => {

  }, [movies])

  return (
    <div className={styles.categories}>
      {movies.length <= 0 ?
      listMovies.map((movie, index) => (
        <RowMovies key={index} url={movie.url}>{movie.name}</RowMovies>
      )
    )
    :
    <div>
      <h3 className={styles.titleFilters}>{nameList}</h3>
      <div className={styles.specific}>
        {list.map((movie, index) => (
            <MovieItem key={movie.id} movie={movie} />
          ))
        }
      </div>
    </div>
  }
    </div>
  );
}
