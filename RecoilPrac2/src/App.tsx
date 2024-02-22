import React from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import DraggableCard from './Components/DraggableCad';

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

/** Style End */

function App() {
  /** atom의 value + atom을 수정하는함수 가져오기 */
  const [toDos, setToDos] = useRecoilState(toDoState);
  // console.log(toDos);

  /** drag가 끝났을 때 실행되는 함수 */
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    console.log('draggin finished');

    /** 카드를 옮기다가 그대로 두는 경우 -> 별도 action 취하지 않게 */
    if (!destination) return;

    /** source-> 특정 카드가 클릭된 것이 확인되면 destination 어디로 갈지 알 수 있으니, 특정 카드를 지웠다가 해당 값을 목적지로 이동시켜주기  */
    setToDos((currentToDos) => {
      console.log('Delete item on', source.index);

      /** 기존 currentToDos 원본을 바꿀 수 없으니 복사 */
      const toDosCopy = [...currentToDos];

      /** 1.선택한 카드 배열에서 지우기 source.index */
      toDosCopy.splice(source.index, 1);
      console.log('복사 배열에서 옮긴 카드 지우기: ', toDosCopy);

      /** 2. 지운 카드를 새로운 목적지 Index에 다시 넣어주기 */
      toDosCopy.splice(destination?.index, 0, draggableId);

      return toDosCopy;
    });
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
                  <DraggableCard toDo={toDo} index={index} key={toDo} />
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
 * splice -> 원본 값을 변경
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
