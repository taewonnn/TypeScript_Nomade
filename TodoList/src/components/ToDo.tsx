import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';

function ToDo({ text, category }: IToDo) {
  // Recoil - useSetRecoilState() : atom의 값 변경을 위한 modifier 함수
  const setToDos = useSetRecoilState(toDoState);

  // toDo의 카테고리를 바꾸는 함수
  // IToDo의 category만 가져와서 타입 재사용
  const onChangeCat = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.currentTarget.name -> 내가 클릭한 버튼의 name - TO DO ? DOING ? DONE ?
    // console.log('i selected :', event.currentTarget.name);

    // event.currentTarget.name을 간단하게 가져오기 -> event에 있는 currentTarget 중에 name
    const {
      currentTarget: { name },
    } = event;
  };
  console.log('i clicked :', name);

  return (
    <li>
      <span>{text}</span>
      {category !== 'TO_DO' && (
        <button name="TO_DO" onClick={onChangeCat}>
          To Do
        </button>
      )}
      {category !== 'DOING' && (
        <button name="DOING" onClick={onChangeCat}>
          Doing
        </button>
      )}
      {category !== 'DONE' && (
        <button name="DONE" onClick={onChangeCat}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;

// 함수 사용 방식 2
// function ToDo({ text, category }: IToDo) {
//   // toDo의 카테고리를 바꾸는 함수
//   // IToDo의 category만 가져와서 타입 재사용
//   const onChangeCat = (selectedCat: IToDo['category']) => {
//     //selectedCat -> 내가 클릭한 버튼 - TO DO ? DOING ? DONE ?
//     console.log('i selected :', selectedCat);
//   };

//   return (
//     <li>
//       <span>{text}</span>
//       {category !== 'TO_DO' && <button onClick={() => onChangeCat('TO_DO')}>To Do</button>}
//       {category !== 'DOING' && <button onClick={() => onChangeCat('DOING')}>Doing</button>}
//       {category !== 'DONE' && <button onClick={() => onChangeCat('DONE')}>Done</button>}
//     </li>
//   );
// }
