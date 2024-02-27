import { useQuery } from '@tanstack/react-query';
import { IGetMovieResult, getMovies } from '../api';
import styled from 'styled-components';

/** Style Start */
const Wrapper = styled.div`
  background-color: black;
`;
/** Style End */

function Home() {
  /** 상영중인 영화 가져오기 */
  console.log('render!!');
  const { data, isLoading } = useQuery<IGetMovieResult>({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: getMovies,
  });
  console.log(data, isLoading);
  /** 상영중인 영화 가져오기 */

  return <Wrapper style={{ height: '200vh' }}></Wrapper>;
}

export default Home;
