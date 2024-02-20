import { useRecoilValue } from 'recoil';
import { toDoSelector, toDoState } from '../atoms';
import CreateToDO from './CreateToDo';
import ToDo from './ToDo';

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
  // console.log('to Do 작성 : ', toDos);
  // 결과 ->
  //   [
  //     {
  //         "text": "5번",
  //         "id": 1708391956858,
  //         "category": "TO_DO"
  //     },
  //     {
  //         "text": "4번",
  //         "id": 1708391956033,
  //         "category": "TO_DO"
  //     },
  //     {
  //         "text": "3번",
  //         "id": 1708391955300,
  //         "category": "TO_DO"
  //     },
  //     {
  //         "text": "2번",
  //         "id": 1708391954489,
  //         "category": "TO_DO"
  //     },
  //     {
  //         "text": "1번",
  //         "id": 1708391953536,
  //         "category": "TO_DO"
  //     }
  // ]
  // 위에 목록 중에 특정 todo의 카테고리를 바꾸기 위해
  // 1. id를 기준으로 어떤 todo를 클릭했는지 찾아야한다! -> array안에 있는 object의 index를 찾기

  // selectortOutput
  // const selectorOutput = useRecoilValue(toDoSelector);
  // console.log(selectorOutput);
  const [toDo, doing, done] = useRecoilValue(toDoSelector);

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

      <h2>To DO</h2>
      {/* toDo 목록 */}
      <ul>
        {toDo.map((toDo) => (
          // ❗️ 위 아래 같은 의미 이유 -> ?? 속성이 같아서
          // <ToDo key={toDo.id} id={toDo.id} text={toDo.text} category={toDo.category} />
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />

      <h2>DOING</h2>
      {/* DOING 목록 */}
      <ul>
        {doing.map((toDo) => (
          // ❗️ 위 아래 같은 의미 이유 -> ?? 속성이 같아서
          // <ToDo key={toDo.id} id={toDo.id} text={toDo.text} category={toDo.category} />
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />

      <h2>DONE</h2>
      {/* toDo 목록 */}
      <ul>
        {done.map((toDo) => (
          // ❗️ 위 아래 같은 의미 이유 -> ?? 속성이 같아서
          // <ToDo key={toDo.id} id={toDo.id} text={toDo.text} category={toDo.category} />
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
    </div>
  );
}

export default ToDoList;
