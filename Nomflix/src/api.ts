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

/** 영화 데이터 가져오기 */
export function getMovies() {
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
  ).then((response) => response.json());
}
/** 영화 데이터 가져오기 */

/** 영화 데이터 가져오기 */
/** 영화 데이터 가져오기 */

// API: https://api.themoviedb.org/3/search/movie?api_key=api_key&language=en-US&query=hello&page=1&include_adult=false
// https://developers.themoviedb.org/3/search/search-movies
