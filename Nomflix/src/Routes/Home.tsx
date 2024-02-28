import { useQuery } from '@tanstack/react-query';
import { IGetMovieResult, getMovies } from '../api';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import useWindowDimensions from './Components/useWindowDimensions';

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

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
`;
/** Style End */

/** Box 6개씩 보여주기 */
const offest = 6;
/** Box 6개씩 보여주기 */

function Home() {
  const width = useWindowDimensions();

  /** 상영중인 영화 가져오기 */
  console.log('render!!');
  const { data, isLoading } = useQuery<IGetMovieResult>({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: getMovies,
  });
  console.log('상영중인 영화 data 확인 :', data);
  /** 상영중인 영화 가져오기 */

  /** 슬라이드 - index */
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  // index 증가 함수
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      // 1개는 상단에 사용 중이라 -1
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offest) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  /** 슬라이드 - index */

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                initial={{ x: width + 10 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 10 }}
                transition={{ type: 'tween', duration: 1 }}
                key={index}
              >
                {/* data?.results.slice(1) -> 상단에 1개는 이미 사용해서 해당 영화는 제외하고 나머지만 받아오기 위해  */}
                {data?.results
                  .slice(1)
                  .slice(offest * index, offest * index + offest)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      bgPhoto={makeImagePath(movie.backdrop_path, 'w500' || '')}
                    ></Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;

/** Ex. */
// const offset = 6;
// let page = 0;

// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].slice(offset * page,offset * page + offset);   //  [1, 2, 3, 4, 5, 6]

// let page1 = 1;
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].slice( offset * page1,offset * page1 + offset);   //  [7, 8, 9, 10, 11, 12]
