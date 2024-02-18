import { useForm } from 'react-hook-form';

function Register() {
  // react-hook-form 사용 에시 - 회원가입
  const { register, watch, handleSubmit } = useForm();
  // console.log(register('toDo')); // {name: 'toDo', onChange: ƒ, onBlur: ƒ, ref: ƒ}

  // 💡 watch -> form 입력값들의 변화를 관찰할 수 있게 해주는 함수
  console.log('입력값 : ', watch()); // input에 내가 입력한 값을 콘솔에서 보여준다!
  // Ex.
  // {
  //   "email": "thisis_tw94@naver.com",
  //   "firstName": "taewon",
  //   "lastName": "park",
  //   "username": "daram",
  //   "password": "1234",
  //   "passwordConfirm": "1234"
  // }

  // 💡 handleSubmit -> validation
  // handleSubmit('데이터가 유효할 때 호출되는 함수', '데이터가 유효하지 않을 때 호출되는 함수')
  // console.log(handleSubmit);

  // validation이 끝난 이후 실행되는 함수
  const onValid = (data: any) => {
    console.log('제출 데이터 : ', data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)} style={{ display: 'flex', flexDirection: 'column' }}>
        {/* 💡 register -> input의 onchange onblur 이벤트를 대신해줌 즉, userState / onChage 함수를 손수 쓸 필요가 없음 */}
        <input {...register('email', { required: true })} type="text" placeholder="email" />

        <input
          {...register('firstName', { required: true, minLength: 2 })}
          type="text"
          placeholder="firstName"
        />

        <input
          {...register('lastName', { required: true, minLength: 2 })}
          type="text"
          placeholder="lastName"
        />

        <input
          {...register('username', { required: true, maxLength: 5 })}
          type="text"
          placeholder="username"
        />

        <input
          {...register('password', { required: true, minLength: 5 })}
          type="text"
          placeholder="password"
        />

        <input
          {...register('passwordConfirm', { required: true, minLength: 5 })}
          type="text"
          placeholder="passwordConfirm"
        />
        <button>가입하기</button>
      </form>
    </div>
  );
}

export default Register;
