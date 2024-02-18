import { useForm } from 'react-hook-form';

function ToDoList() {
  // react-hook-form 사용
  const { register, watch } = useForm();
  // console.log(register('toDo')); // {name: 'toDo', onChange: ƒ, onBlur: ƒ, ref: ƒ}

  // watch -> form 입력값들의 변화를 관찰할 수 있게 해주는 함수
  console.log(watch()); // input에 내가 입력한 값을 콘솔에서 보여준다!
  return (
    <div>
      <form>
        {/* register -> input의 onchange onblur 이벤트를 대신해줌 즉, userState / onChage 함수를 손수 쓸 필요가 없음 */}
        <input {...register('toDo')} type="text" placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
