import { useForm } from 'react-hook-form';

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
    </div>
  );
}

export default ToDoList;
