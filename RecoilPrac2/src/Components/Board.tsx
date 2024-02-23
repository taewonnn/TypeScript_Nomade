import { useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCad';
import styled from 'styled-components';

/** Style Start */
const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? '#dfe6e9' : props.isDraggingFromThis ? '#b2bec3' : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
/** Style End */

/**Interface Start */
interface IBoardProps {
  toDos: string[];
  boardId: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
/**Interface End */

function Board({ toDos, boardId }: IBoardProps) {
  /* 💡useref 개념 */
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    // 클릭 시 focus
    // Js에서 document.querySelector()
    inputRef.current?.focus();

    // 5초 이후 blur
    setTimeout(() => {
      inputRef.current?.blur();
    }, 5000);
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>

      {/* 💡ref 개념 */}
      <input ref={inputRef} placeholder="grab me" type="text" />
      <button onClick={onClick}>Click me</button>
      {/* 💡ref 개념 */}

      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            // 💡 ref -> React 코드를 이용해 HTML 요소를 지정하고 가져올 수 있는 방법
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard toDo={toDo} index={index} key={toDo} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
