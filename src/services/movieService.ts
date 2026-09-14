import axios from 'axios';
import type { Movie } from '../types/movie';

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const movieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    Accept: 'application/json',
  },
});

const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await movieInstance.get<TMDBResponse>('/search/movie', {
    params: {
      query,
      language: 'en-US',
      include_adult: false,
    },
  });

  return response.data.results;
};

export default fetchMovies;