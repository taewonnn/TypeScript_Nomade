import { Variants, AnimatePresence } from 'framer-motion';
import * as Style from './MovieSlider.styles';
import { makeImagePath } from '../../utils';
import { IGetMovieResult } from '../../api';

/** Interface Start */
interface MovieSliderProps {
  toggleLeaving: () => void;
  width: number;
  index: number;
  data: IGetMovieResult | undefined;
  offset: number;
  onBoxClicked: (movieId: number) => void;
  BoxVariants: Variants;
  infoVariants: Variants;
}
/** Interface End */

function MovieSlider({
  toggleLeaving,
  width,
  index,
  data,
  offset,
  onBoxClicked,
  BoxVariants,
  infoVariants,
}: MovieSliderProps) {
  return (
    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
      <Style.Row
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
            <Style.Box
              layoutId={movie.id + ''}
              onClick={() => onBoxClicked(movie.id)}
              key={movie.id}
              initial="normal"
              whileHover="hover"
              variants={BoxVariants}
              bgPhoto={makeImagePath(movie.backdrop_path, 'w500' || '')}
            >
              <Style.Info variants={infoVariants}>{<h4>{movie.title}</h4>}</Style.Info>
            </Style.Box>
          ))}
      </Style.Row>
    </AnimatePresence>
  );
}

export default MovieSlider;
