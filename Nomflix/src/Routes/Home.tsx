import { useQuery } from '@tanstack/react-query';
import { IGetMovieResult, getMovies } from '../api';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
`;
/** Style End */

/** Slider motion */
const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};
/** Slider motion */

function Home() {
  /** 상영중인 영화 가져오기 */
  console.log('render!!');
  const { data, isLoading } = useQuery<IGetMovieResult>({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: getMovies,
  });
  console.log(data, isLoading);
  /** 상영중인 영화 가져오기 */

  /** 슬라이드 - index */
  const [index, setIndex] = useState(0);
  // index 증가 함수
  const increaseIndex = () => {
    setIndex((prev) => prev + 1);
  };
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
            <AnimatePresence>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ type: 'tween', duration: 1 }}
                exit="exit"
                key={index}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Box key={i}>{i}</Box>
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
