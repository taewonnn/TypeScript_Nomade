import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

/** Style Start */
const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => (props.isDragging ? '#74b9ff' : props.theme.cardColor)};
  box-shadow: ${(props) => (props.isDragging ? '0px 2px 25px rgba(0, 0, 0, 0.5)' : 'none')};
`;
/** Style End */

/** Interface Start */
interface IDraggableCardProps {
  toDo: string;
  index: number;
}
/** Interface End */

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  /** 렌더링 횟수 확인 */
  // components의 state가 바뀌면 모두 렌더링!
  // 부모의 state가 바뀌면 부모의 자식들도 모두 다시 렌더링!
  // => react.memo  -> prop이 바뀌지 않는다면 굳이 렌더링 하지 말아줘!

  console.log(toDo, 'has been rendered');

  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

/** memo  -> prop이 바뀌지 않는다면 DraggableCard를 굳이 다시 렌더링 하지 말아줘! */
export default memo(DraggableCard);
