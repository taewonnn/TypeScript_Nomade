import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCad';
import styled from 'styled-components';

/** Style Start */
const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? 'pink' : props.isDraggingFormThis ? 'red' : 'blue'};
  flex-grow: 1;
`;
/** Style End */

/**Interface Start */
interface IBoardProps {
  toDos: string[];
  boardId: string;
}

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFormThis: boolean;
}
/**Interface End */

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFormThis={Boolean(snapshot.draggingFromThisWith)}
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
