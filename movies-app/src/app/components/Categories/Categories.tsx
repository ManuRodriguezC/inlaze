'use client';

import styles from "@/app/styles/categories.module.css";
import RowMovies from "./RowMovies";
import { listMovies } from "../ListMoviesOptions";
import useStore from "@/app/store/store";
import { useEffect } from "react";
import MovieItem from "./Poster";

export default function Categories() {

  const { movies, listFilterMovies, nameList, listFavories, listSaved } = useStore()
  const list = listFilterMovies.length > 0 ? listFilterMovies : movies
  useEffect(() => {

  }, [movies])

  return (
    <div className={styles.categories}>
      {movies.length <= 0 ? (
        <>
          {listMovies.map((movie, index) => (
            <RowMovies key={index} url={movie.url}>{movie.name}</RowMovies>
          )
        )}
        {listFavories.length > 0&&<RowMovies key="favorites" listMovies={listFavories}>Favorites</RowMovies>}
        {listSaved.length > 0&&<RowMovies key="saved" listMovies={listFavories}>Saved</RowMovies>}
        </>
      ) :
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
