import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

/** Style Start */
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
/** Style End */

/** Interface Start */
interface IDraggableCardProps {
  toDo: string;
  index: number;
}
/** Interface End */

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default DraggableCard;
