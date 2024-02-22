import React from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';

/** Style Start */
const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
/** Style End */

function App() {
  /** atom의 value + atom을 수정하는함수 가져오기 */
  const [toDos, setToDos] = useRecoilState(toDoState);
  console.log(toDos);

  /** drag가 끝났을 때 실행되는 함수 */
  const onDragEnd = ({ destination, source }: DropResult) => {
    console.log('draggin finished');

    /** source-> 특정 카드가 클릭된 것이 확인되면 destination 어디로 갈지 알 수 있으니, 특정 카드를 지웠다가 해당 값을 목적지로 이동시켜주기  */
  };
  /** argum을 하나하나 정의하는 케이스 */
  // const onDragEnd = ({ ...argum }: DropResult) => {
  //   // console.log('darggin finished');
  //   // console.log('arguments 확인 :', argum); // {"draggableId": "b","type": "DEFAULT","source": {    "index": 1,    "droppableId": "one"},"reason": "DROP","mode": "FLUID","destination": {    "droppableId": "one",    "index": 2},"combine": null}
  //   const destination = argum.destination?.index;
  // };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <Draggable key={index} draggableId={toDo} index={index}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.dragHandleProps}
                        {...magic.draggableProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

/** 
 * splice
Arr.splice('지우고 싶은 item이 시작하는 위치', '지우고싶은 Item 개수')
Arr.splice('넣고싶은 item이 시작하는 위치', '지우고싶은 Item 개수 없으면 0','넣고싶은 item')


const x = ['a', 'b', 'c', 'd', 'e', 'f'];

'a'를 빼고싶을 때,
x.splice(0, 1)  // 지운 item이 어떤 것인지 알려줌 ['a']
console.log(x);  // (5) ['b', 'c', 'd', 'e', 'f']


'a'를 다시 두번째 Index에 넣고싶을 때,
x.splice(2, 0, 'a');
console.log(x)  // ['b', 'c', 'a', 'd', 'e', 'f']
 */
