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

/** 공통 */
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
  },
};
/** 공통 */

/**
 * 영화 데이터 가져오기
 *
 */
export function getMovies() {
  return fetch(`${process.env.REACT_APP_BASE_URL}/movie/now_playing?language=ko`, options).then(
    (response) => response.json()
  );
}

/**
 * 유명한 영화 가져오기
 *
 */
export function getPopularMovie() {
  return fetch(`${process.env.REACT_APP_BASE_URL}/movie/popular?language=ko`, options).then(
    (response) => response.json()
  );
}
