import { useForm } from 'react-hook-form';
import styled from 'styled-components';

/** Style Start */
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;
/** Style End */

/** Interface Start */
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  passwordConfirm: string;
  extraError?: string;
}
/** Interface End */

function Register() {
  // react-hook-form 사용 에시 - 회원가입
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: { email: '@naver.com' },
  });
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
  const onValid = (data: IForm) => {
    console.log('제출 데이터 : ', data);
    // 비밀번호 - 비밀번호 확인이 같지 않은 경우 에러
    if (data.password !== data.passwordConfirm) {
      setError('passwordConfirm', { message: 'password are not the same' }, { shouldFocus: true });
    }

    // form 전체에 해당하는 에러 - server Erorr
    // setError('extraError', { message: '500 ERROR' });
  };

  // 💡setError - 특정한 에러를 발생시키게 해준다. / 특정 input에 포커싱
  // Ex. setError('Input 이름', { message: '메시지 내용' }, { shouldFocus: true -> 포커싱 });

  // 💡 formState - {errors} : form 각각 input의 value 확인 및 error message
  // validation
  // console.log(formState);
  console.log('form validation : ', errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)} style={{ display: 'flex', flexDirection: 'column' }}>
        {/* 💡 register -> input의 onchange onblur 이벤트를 대신해줌 즉, userState / onChage 함수를 손수 쓸 필요가 없음 */}
        <InputContainer>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                message: 'Only naver.com emails allowed',
              },
            })}
            type="text"
            placeholder="email"
          />
          <span>{errors?.email?.message}</span>
        </InputContainer>

        <InputContainer>
          <input
            {...register('firstName', {
              required: 'firstName is required',
              // 💡validate : 함수 / 여러 개의 함수를 객체로 가능
              // 입력값에 대한 validation + error message
              // 특정단어(bit)는 제출 불가하게 막기

              // 여러 개의 함수를 객체로 쓸 때,
              validate: {
                noBit: (value) => !value.includes('bit') || 'no bit allowed',
                noNico: (value) => !value.includes('nico') || 'no bit allowed',
              },

              // 함수 1개만 쓸 때,
              // validate: (value) => !value.includes('bit') || 'no bit allowed',
            })}
            type="text"
            placeholder="firstName"
          />
          <span>{errors?.firstName?.message}</span>
        </InputContainer>

        <InputContainer>
          <input
            {...register('lastName', { required: 'lastName is required', minLength: 2 })}
            type="text"
            placeholder="lastName"
          />
          <span>{errors?.lastName?.message as string}</span>
        </InputContainer>

        <InputContainer>
          <input
            {...register('username', { required: 'usename is required', minLength: 2 })}
            type="text"
            placeholder="username"
          />
          <span>{errors?.username?.message}</span>
        </InputContainer>

        <InputContainer>
          <input
            {...register('password', { required: 'Password is required', minLength: 3 })}
            type="text"
            placeholder="password"
          />
          <span>{errors?.password?.message}</span>
        </InputContainer>

        <InputContainer>
          <input
            {...register('passwordConfirm', {
              required: 'PasswordConfirm is required',
              minLength: {
                value: 3,
                message: 'Your Passowrd is too short',
              },
            })}
            type="text"
            placeholder="passwordConfirm"
          />
          <span>{errors?.passwordConfirm?.message}</span>
        </InputContainer>

        <button>가입하기</button>

        {/* 💡errors?. -> ?를 붙이는 이유 : errors가 undefined라면 그 뒤를 실행하지 않는다! */}
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default Register;
