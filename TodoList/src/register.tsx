import { useForm } from 'react-hook-form';

function Register() {
  // react-hook-form 사용 에시 - 회원가입
  const { register, watch } = useForm();
  // console.log(register('toDo')); // {name: 'toDo', onChange: ƒ, onBlur: ƒ, ref: ƒ}

  // watch -> form 입력값들의 변화를 관찰할 수 있게 해주는 함수
  console.log(watch()); // input에 내가 입력한 값을 콘솔에서 보여준다!
  // Ex.
  // {
  //   "email": "thisis_tw94@naver.com",
  //   "firstName": "taewon",
  //   "lastName": "park",
  //   "username": "daram",
  //   "password": "1234",
  //   "passwordConfirm": "1234"
  // }
  return (
    <div>
      <form>
        {/* register -> input의 onchange onblur 이벤트를 대신해줌 즉, userState / onChage 함수를 손수 쓸 필요가 없음 */}
        <input {...register('email')} type="text" placeholder="email" />

        <input {...register('firstName')} type="text" placeholder="firstName" />

        <input {...register('lastName')} type="text" placeholder="lastName" />

        <input {...register('username')} type="text" placeholder="username" />

        <input {...register('password')} type="text" placeholder="password" />

        <input {...register('passwordConfirm')} type="text" placeholder="passwordConfirm" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default Register;
