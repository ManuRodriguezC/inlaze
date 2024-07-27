export interface Movie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: BelongsToCollection;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MoviePageProps {
    id: string;
}
  
export interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}
  
export interface Genre {
    id: number;
    name: string;
}
  
export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}
  
export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}
  
export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}
  
export interface Person {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
};
  
export interface Review {
    author: string;
    content: string;
    id: string;
    url: string;
}
  
export interface Summary {
    results: Review[];
}