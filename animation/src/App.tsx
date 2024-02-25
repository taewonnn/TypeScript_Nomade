import styled from 'styled-components';
import { motion } from 'framer-motion';

/**Style Start */
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/** styled componenet motion 적용 방벙 -> styled(motion.) */
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
/**Style End */

/** animation - Ex1 - 축약 */
// const myVars = {
//   start: { scale: 0 },
//   end: { scale: 1, rotateZ: 360, transition: { type: 'spring', bounce: 0.5, delay: 0.5 } },
// };

/**animation - Ex2 */
const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 3,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

function App() {
  return (
    <Wrapper>
      {/* animation - Ex1 - 축약 */}
      {/* <Box variants={myVars} initial="start" animate="end"></Box> */}

      {/* animation - Ex2 */}

      {/* animation - Ex2 */}
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle />
        <Circle />
        <Circle />
        <Circle />
      </Box>

      {/* animation - Ex1 */}
      {/* <Box
        // 초기값
        initial={{ scale: 0 }}
        // 동작
        animate={{ scale: 1, rotateZ: 360 }}
        // 최종 스타일
        transition={{ type: 'spring', bounce: 0.5, delay: 0.5 }}
      ></Box> */}
      {/* animation - Ex1 */}

      {/* motion 사용법 Ex. */}
      {/* <Box transition={{ duration: 3 }} animate={{ borderRadius: '100px' }} /> */}
      {/* <motion.div>1</motion.div> */}
      {/* motion 사용법 Ex. */}
    </Wrapper>
  );
}

export default App;
