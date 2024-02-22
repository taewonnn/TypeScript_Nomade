import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCad';
import styled from 'styled-components';

/** Style Start */
const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
/** Style End */

/**Interface Start */
interface IBoardProps {
  toDos: string[];
  boardId: string;
}
/**Interface End */

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard toDo={toDo} index={index} key={toDo} />
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Board;
