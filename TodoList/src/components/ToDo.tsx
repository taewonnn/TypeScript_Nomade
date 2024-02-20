import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';

function ToDo({ text, category, id }: IToDo) {
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

    setToDos((oldToDos) => {
      // 선택한 todo의 id 가져오기
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      console.log('클릭한 타겟의 Index : ', targetIndex);

      // 클릭한 특정 todo의 값(oldToDo) - > ex. {text: '4번', id: 1708392421566, category: 'TO_DO'}
      const oldToDo = oldToDos[targetIndex];
      console.log('기존', oldToDo);

      // newToDo -> category를 바꾸기 위해 newToDo로 생성해서 category값을 새로운 값으로 바꿔준다.
      // 이 때 새로운 category의 값은 ?? => 이전에 유저가 버튼 클릭했을 때, 해당 버튼이 어떤 것인지 가져왔던 -> name!!
      const newToDo = { text, id, category: name };
      console.log('수정', newToDo);

      // oldToDo의 category를 newToDo의 category값으로 변경하면 완료!

      return oldToDos;
    });
  };

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
