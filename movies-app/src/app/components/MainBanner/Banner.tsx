import { fetchMovies } from "@/app/api/fechtMovies";
import { useEffect, useState } from "react";
import styles from "@/app/styles/banner.module.css"
import Image from "next/image";
import CircularProgress from "../Categories/CircularProgress";
import Save from "@/app/icons/Save";
import Share from "@/app/icons/Share";
import LikeEmpty from "@/app/icons/LikeEmpty";

export default function Banner() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const urlMovies = 'https://api.themoviedb.org/3/trending/movie/day'
        
        const fetchAndSetMovies = async () => {
            const results = await fetchMovies(urlMovies)
            if (results) {
                setMovies(results.results)
            }
        }
        fetchAndSetMovies()
    }, [])

    return (
        <section className={styles.banners}>
            {movies.slice(0, 1).map((movie: any) => (
                <section key={`bannerMovie${movie.idmovie}`} className={styles.banner}>
                <Image
                    className={styles.image}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={"movieee"}
                    fill
                    sizes="100vw"
                    />
                <div className={styles.infoBanner}>
                    <h3>{movie.title}</h3>
                    <div className={styles.score}>
                        <p>{movie.overview}</p>
                        <CircularProgress radius={65} stroke={7} fontSize={36} width="700" percentage={Math.floor(movie.vote_average * 10)} />
                    </div>
                    <div className={styles.downInfo}>
                        <div className={styles.genres}>
                            <button onClick={() => console.log("view")}>Trama</button>
                            <button>Cast</button>
                            <button>Gallery</button>
                            <button>Info</button>
                        </div>
                        <div>
                            <LikeEmpty />
                            <Save />
                            <Share />
                        </div>
                    </div>
                </div>
                </section>
            ))}
        </section>
    )
}

