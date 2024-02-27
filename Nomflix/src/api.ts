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
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
  ).then((response) => response.json());
}
