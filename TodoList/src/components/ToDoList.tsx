import { useForm } from 'react-hook-form';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

/** Recoil Start - 파일 분리 예정 */
const toDoState = atom({
  key: ' toDo',
  default: [],
});
/** Recoil End - 파일 분리 예정 */

/** Interface Start */
interface IForm {
  toDo: string;
}
/** Interface End */

function ToDoList() {
  // react-hook-form 사용
  const { register, watch, handleSubmit, setValue } = useForm<IForm>();

  // input에 내가 입력한 값을 콘솔에서 보여준다!
  console.log(watch('toDo'));

  // 제출한 데이터 확인
  const handleValid = (data: IForm) => {
    console.log('제출 add to do : ', data.toDo);

    // 제출하고 난 후 Input 깂 비워주기
    setValue('toDo', '');
  };

  // Recoil
  // 💡useRecoilState => atom의 value값과 변경을 위한 modifier 함수를 한 번에 가져오기
  const [value, modFn] = useRecoilState(toDoState);

  //  각각 사용 시
  // 💡useRecoilValue : atom의 value에 접근하기 위해 사용
  // toDoState이라는 atom의 value에 접근!
  // const value = useRecoilValue(toDoState);

  // 💡useSetRecoilState: atom의 값 변경을 위한 modifier 함수
  // const modFn = useSetRecoilState(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        {/* register -> input의 onchange onblur 이벤트를 대신해줌 즉, userState / onChage 함수를 손수 쓸 필요가 없음 */}
        <input
          {...register('toDo', {
            required: 'Please Write a To Do',
          })}
          type="text"
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>

      {/* toDo 목록 */}
      <ul></ul>
    </div>
  );
}

export default ToDoList;
