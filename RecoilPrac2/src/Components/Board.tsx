import { useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCad';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ITodo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

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

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
/** Style End */

/**Interface Start */
interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IForm {
  toDo: string;
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

  /** useForm() */
  const { register, handleSubmit, getValues, setValue } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    console.log('제출한 data 확인: ', toDo);

    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    console.log('작성한 내용 obj에 작성시간과 함께 저장 :', newToDo);

    // 저장한 obj를 atom 배열에 넘겨주기
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });

    // 제출 후 input 다시 비워주기
    setValue('toDo', '');
  };

  /** useSetRecoilState  */
  // todo 조작할 수 있는 함수
  const setToDos = useSetRecoilState(toDoState);
  return (
    <Wrapper>
      <Title>{boardId}</Title>

      {/* 💡ref 개념 */}
      {/* <input ref={inputRef} placeholder="grab me" type="text" />
      <button onClick={onClick}>Click me</button> */}
      {/* 💡ref 개념 */}

      {/* useForm() */}
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      {/* useForm() */}

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
              <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
