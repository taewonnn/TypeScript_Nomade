import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './Components/Board';

/** Style Start */
const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(1, 1fr);
`;
/** Style End */

function App() {
  /** atom의 value + atom을 수정하는함수 가져오기 */
  const [toDos, setToDos] = useRecoilState(toDoState);
  // console.log(toDos);

  /** drag가 끝났을 때 실행되는 함수 */
  /** case2:  argum을 한 번에 받아와서 꺼내 쓰는  케이스 */
  const onDragEnd = (info: DropResult) => {
    console.log('darggin finished');
    console.log('info 확인 :', info);
    const { destination, draggableId, source } = info;

    // 카드를 옮기다가 그대로 두는 경우 -> 별도 action 취하지 않게
    if (!destination) return;

    // 한 보드 안에서 카드를 옮길 때,
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        // 일단 모든 보드를 가져온 후, 수정이 일어난 보드의 배열만 복사한다.
        const boardCopy = [...allBoards[source.droppableId]];
        // 수정이 일어난 보드 복사해서 카드 옮겨주기
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          // 모든 보드를 리턴 해주는데, 수정한 보드는 위에서 복사로 옮긴 배열로 넣어주기
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    // 서로 다른 보드 간 카드를 옮길 때,
    if (destination?.droppableId !== source.droppableId) {
      // 두개의 복사본을 만들어야 한다 => 선택한 카드의 배열 + 그 카드를 옮기기로 한 보드의 배열
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];

        // 기존 보드에서 선택한 카드를 지워주기
        sourceBoard.splice(source.index, 1);

        // 이동하고자 하는 보드에 선택한 카드 추가해주기
        destinationBoard.splice(destination?.index, 0, draggableId);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  /** drag가 끝났을 때 실행되는 함수 */
  /** case2:  필요한 파라미터만 꺼내 쓰는 케이스 */
  //const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
  //   console.log('draggin finished');

  /** source-> 특정 카드가 클릭된 것이 확인되면 destination 어디로 갈지 알 수 있으니, 특정 카드를 지웠다가 해당 값을 목적지로 이동시켜주기  */
  //setToDos((currentToDos) => {
  // console.log('Delete item on', source.index);

  // /** 기존 currentToDos 원본을 바꿀 수 없으니 복사 */
  // const toDosCopy = [...currentToDos];
  // /** 1.선택한 카드 배열에서 지우기 source.index */
  // toDosCopy.splice(source.index, 1);
  // console.log('복사 배열에서 옮긴 카드 지우기: ', toDosCopy);
  // /** 2. 지운 카드를 새로운 목적지 Index에 다시 넣어주기 */
  // toDosCopy.splice(destination?.index, 0, draggableId);
  // return toDosCopy;
  // });
  // };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

/**
  💡 splice -> 원본 값을 변경
  Arr.splice('지우고 싶은 item이 시작하는 위치', '지우고싶은 Item 개수')
  Arr.splice('넣고싶은 item이 시작하는 위치', '지우고싶은 Item 개수 없으면 0','넣고싶은 item')

  const x = ['a', 'b', 'c', 'd', 'e', 'f'];

  'a'를 빼고싶을 때,
  x.splice(0, 1)  // 지운 item이 어떤 것인지 알려줌 ['a']
  console.log(x);
  (5) ['b', 'c', 'd', 'e', 'f']

  'a'를 다시 두번째 Index에 넣고싶을 때,
  x.splice(2, 0, 'a');
  console.log(x)  // ['b', 'c', 'a', 'd', 'e', 'f']
 */

/**
  💡 object loop

  const toDos = {
    x: ['a', 'b'],
    z: ['n', 't'],
  }

  💡Objext.keys()  -> object의 key만 뽑아서 array로 만들어줌
  Object.keys(toDos)    -> ['x','y']

  Object.keys(toDos).map(boardId => toDos[boardId])   
  결과 ->
  0: (2) ['a', 'b']
  1: (2) ['n', 't']

  💡Objext.values()  -> object의 values만 뽑아서 array로 만들어줌
  Object.values(toDos)   -> (2) [Array(2), Array(2)]  0: (2) ['a', 'b']  1: (2) ['n', 't']
 */
