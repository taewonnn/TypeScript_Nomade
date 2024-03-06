import { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as Style from './Home.styles';
import { IGetMovieResult, getMovies } from '../../api';
import { makeImagePath } from '../../utils';
import { AnimatePresence } from 'framer-motion';
import useWindowDimensions from '../Components/useWindowDimensions';
import MovieSlider from '../MovieSlider/MovieSlider';

/** animation */
// Box 6개씩 보여주기
const offset = 6;

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
/** animation */

function Home2() {
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
    <Style.Wrapper>
      {isLoading ? (
        <Style.Loader>Loading...</Style.Loader>
      ) : (
        <>
          <Style.Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <Style.Title>{data?.results[0].title}</Style.Title>
            <Style.Overview>{data?.results[0].overview}</Style.Overview>
          </Style.Banner>
          {/* 슬라이드 영역 - 첫번째 줄 */}
          <Style.Slider>
            <MovieSlider
              toggleLeaving={toggleLeaving}
              width={window.innerWidth}
              index={index}
              data={data}
              offset={6}
              onBoxClicked={onBoxClicked}
              BoxVariants={BoxVariants}
              infoVariants={infoVariants}
            />
          </Style.Slider>
          {/* 슬라이드 영역 - 첫번째 줄 */}
          {/* movie 선택 시 상세 화면 -> movies/:movieId 일 때 보여지는 모달 */}
          <AnimatePresence>
            {movieIdMatch ? (
              <>
                <Style.Overlay onClick={onOverlayClicked} variants={overlayVariants} />
                <Style.BigMovie layoutId={movieIdMatch.params.movieId}>
                  {clickedMovie && (
                    <>
                      <Style.BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            'w500'
                          )})`,
                        }}
                      />
                      <Style.BigTitle>{clickedMovie.title}</Style.BigTitle>
                      <Style.BigOverView>{clickedMovie.overview}</Style.BigOverView>
                    </>
                  )}
                </Style.BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Style.Wrapper>
  );
}

export default Home2;

/** Ex. */
// const offset = 6;
// let page = 0;

// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].slice(offset * page,offset * page + offset);   //  [1, 2, 3, 4, 5, 6]

// let page1 = 1;
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].slice( offset * page1,offset * page1 + offset);   //  [7, 8, 9, 10, 11, 12]
