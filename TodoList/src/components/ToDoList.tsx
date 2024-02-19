import { useRecoilValue } from 'recoil';
import { toDoState } from '../atoms';
import CreateToDO from './CreateToDo';

function ToDoList() {
  // 💡 useRecoilState => atom의 value값과 변경을 위한 modifier 함수를 한 번에 가져오기
  // const [value, modFn] = useRecoilState(toDoState);
  // Ex. const [toDos, setToDos] = useRecoilState(toDoState);

  //  각각 사용 시
  // 💡 useRecoilValue : atom의 value에 접근하기 위해 사용
  // toDoState이라는 atom의 value에 접근!
  // const value = useRecoilValue(toDoState);

  // 💡 useSetRecoilState: atom의 값 변경을 위한 modifier 함수
  // const modFn = useSetRecoilState(toDoState);

  // value만 가져오기
  const toDos = useRecoilValue(toDoState);

  // 제출한 데이터 확인 -> CreateToDo.tsx 파일로 이동
  // const handleValid = ({ toDo }: IForm) => {
  //   console.log('제출 add to do : ', toDo);

  //   // 제출한 값 atom 배열에 저장
  //   setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category: 'TO_DO' }, ...oldToDos]);
  //   console.log('atom toDos 확인 :', toDos);

  //   // 제출하고 난 후 Input 깂 비워주기
  //   setValue('toDo', '');
  // };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      {/* To Do 생성 */}
      <CreateToDO />
      {/* toDo 목록 */}
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
