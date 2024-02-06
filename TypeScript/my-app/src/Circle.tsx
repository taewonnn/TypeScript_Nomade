import styled from 'styled-components';

// interface - object의 shpae을 설명해준다.
interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

// optional Props -> 변수 뒤 ? 필수가 아닌 선택
interface CircleProps {
  bgColor: string;
  // borderColor: string | undefined;
  borderColor?: string;
  text?: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 10px solid ${(props) => props.borderColor};
`;

//💡 원한다면 default값을 argument애서 설정 가능!
// text='default text'
// Circle에서 text를 명시 안할 경우 default가 나오고, 명시한다면 명시한 text가 나올 수 있게!
function Circle({ bgColor, borderColor, text = 'default text' }: CircleProps) {
  // Container에는 borderColor가 option이 아니라, 필수로 되어 있으니 그냥 borderColor쓰면 애러
  // borderColor가 undefined 이면 기본값 'black'
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? 'black'}>
      {text}
    </Container>
  );
}

export default Circle;

// interface Ex.
// interface PlayerShape {
//   name: string;
//   age: number;
// }

// const sayHello = (playerObj: PlayerShape) =>
//   `Hello ${playerObj.name}, you are ${playerObj.age} years old`;

// sayHello({ name: 'nico', age: 12 });
