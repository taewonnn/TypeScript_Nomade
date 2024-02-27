import { useQuery } from '@tanstack/react-query';
import { IGetMovieResult, getMovies } from '../api';
import styled from 'styled-components';
import { makeImagePath } from '../utils';

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

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  /** 상단은 어둡고 하단은 투명하게 => linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)) */
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
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
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
