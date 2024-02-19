import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

/** Interface Start */
interface IForm {
  toDo: string;
}
/** Interface End */

function CreateToDO() {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  // toDoState 바꾸는 함수만 가져오기
  const setToDos = useSetRecoilState(toDoState);

  // 제출한 데이터 확인
  const handleValid = ({ toDo }: IForm) => {
    console.log('제출 add to do : ', toDo);

    // 제출한 값 atom 배열에 저장
    setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category: 'TO_DO' }, ...oldToDos]);
    console.log('atom toDos 확인 :', toDo);

    // 제출하고 난 후 Input 깂 비워주기
    setValue('toDo', '');
  };

  return (
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
  );
}

export default CreateToDO;
