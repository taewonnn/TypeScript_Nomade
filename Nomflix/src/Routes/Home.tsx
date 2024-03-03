import { useQuery } from '@tanstack/react-query';
import { IGetMovieResult, getMovies } from '../api';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import useWindowDimensions from './Components/useWindowDimensions';
import { useMatch, useNavigate } from 'react-router-dom';

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
  cursor: pointer;

  // 양쪽 사이드 박스 호버 시 크기 안벗어나게
  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center rigth;
  }
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 60vw;
  height: 70vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.black.lighter}
  opacity: 0;
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  text-align: center;
  font-size: 40px;
`;

/** Style End */

/** Box 6개씩 보여주기 */
const offset = 6;
/** Box 6개씩 보여주기 */

/** animation - Variants */
//박스 선택 시 딜레이
const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -80,
    transition: {
      duration: 0.2,
      delay: 0.5,
    },
  },
};

// 박스 정보
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.5,
    },
  },
};

// overlay(뒤 배경)
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 },
  exit: { opacity: 0 },
};
/** animation - Variants */

function Home() {
  /** useNavigate - url 이동 */
  const navigate = useNavigate();
  /** url 이동  */

  /** useMatch('확인하고자 하는 param') */
  const movieIdMatch = useMatch('/movies/:movieId');
  console.log('!!! movieId 확인', movieIdMatch?.params); // {movieId: '931642'}
  /** useMatch('확인하고자 하는 param') */

  /** 애니메이션 축 좌표 */
  const width = useWindowDimensions();
  /** 애니메이션 축 좌표 */

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
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  /** 슬라이드 - index */

  /** box 클릭 시 함수 */
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  /** box 클릭 시 함수 */

  /** box 클릭 후 뒷 배경 클릭 시 함수 */
  const onOverlayClicked = () => {
    navigate(-1);
  };
  /** box 클릭 후 뒷 배경 클릭 시 함수 */

  /** 클릭한 box의 영화 정보 */
  const clickedMovie =
    movieIdMatch?.params.movieId &&
    data?.results.find((movie) => movie.id + '' === movieIdMatch.params.movieId);
  console.log('click 영화 정보 ', clickedMovie);
  /** 클릭한 box의 영화 정보 */

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
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ''}
                      onClick={() => onBoxClicked(movie.id)}
                      key={movie.id}
                      initial="normal"
                      whileHover="hover"
                      variants={BoxVariants}
                      bgPhoto={makeImagePath(movie.backdrop_path, 'w500' || '')}
                    >
                      <Info variants={infoVariants}>{<h4>{movie.title}</h4>}</Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          {/* movie 선택 시 상세 화면 -> movies/:movieId 일 때 보여지는 모달 */}
          <AnimatePresence>
            {movieIdMatch ? (
              <>
                <Overlay onClick={onOverlayClicked} variants={overlayVariants} />
                <BigMovie layoutId={movieIdMatch.params.movieId}>
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            'w500'
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
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
