import { useQuery } from '@tanstack/react-query';
import { IGetMovieResult, getMovies } from '../api';
import styled from 'styled-components';

/** Style Start */
const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
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

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
