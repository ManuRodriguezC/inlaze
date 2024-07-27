import { getPopularMovies } from "./moviesApi"

export const fetchMovies = async (url: string) => {
    try {
        const result = await getPopularMovies(url)
        return result
    } catch(error) {
        return error
    }
}