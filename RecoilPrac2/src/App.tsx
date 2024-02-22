import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(magic) => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    {/* dragHandleProps -> 해당 영역만 클릭하여 움직일 수 있게하는 속성 */}
                    <span {...magic.dragHandleProps}>🔥</span>
                    One
                  </li>
                )}
              </Draggable>

              <Draggable draggableId="second" index={1}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    <span {...magic.dragHandleProps}>🔥</span>
                    Two
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
