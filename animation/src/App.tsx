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

/** motion 적용 */
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
/**Style End */

function App() {
  return (
    <Wrapper>
      {/* animation - Ex1 */}

      <Box
        // 초기값
        initial={{ scale: 0 }}
        // 동작
        animate={{ scale: 1, rotateZ: 360 }}
        // 최종 스타일
        transition={{ type: 'spring', bounce: 0.5, delay: 0.5 }}
      ></Box>
      {/* motion 사용법 Ex. */}
      {/* <Box transition={{ duration: 3 }} animate={{ borderRadius: '100px' }} /> */}
      {/* <motion.div>1</motion.div> */}
    </Wrapper>
  );
}

export default App;
