const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '201c5a5f0b33feabe2f1ec8ddcb07e2d';

/** Interface Start */

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMovieResult {
  data: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
/** Interface End */

export function getMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
