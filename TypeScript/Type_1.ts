// 기본적인 Type
const a : number[] = [1, 2];
let b : string[] = ['nico', 'nicccc'];
let c : boolean[] = [true, false];
    
// optional Type(선택적 변수)  -> ?
const player2 = {
    name: 'nico',

}

// 아래 에러 뿜는 이유 -> TS가 palyer의 name은 string이라는 것을 추론했기 때문
player2.name = 1;



// age?: number -> age는 필수 요소가 아니다!라는 의미
const playerNico : { name: string, age?: number,} = {
        name: 'nico',
    }

// 'playerNico.age는 undefined일 수 있다고 ts가 알려줌
// if(playerNico.age < 10) {

// }    

if(playerNico.age && playerNico.age < 10) {
    // ~
}


// => type을 미리 지정해두기!
type Player = {
    name: string;
    age?: number;
}

const playerTw : Player = {
    name: 'tw',
    age: 30,
}


// 함수가 return하는 타입 - 1
function playerMaker(name:string) :Player {
    return {
        name: name,
    }
}

// 파라미터 입력 안할 시 에러
// const nico = playerMaker()

const nico = playerMaker('nico');
nico.age = 12;


// 함수가 return하는 타입 - 2
const playerMaker2 = (name:string) => ({name});
const won = playerMaker2('won');

// won.age = 12;  -=> 에러


const playerMaker3 = (name:string) : Player=> ({name});
const daram = playerMaker3('daram');
daram.age = 14;



type Test2 = {
    name: string;
}
// in JS
const jsArrowFunc = ( parameter ) => {}

// in Ts

// 화살표 함수에서 return 값을 객체로 반환할 경우에
//(parameter) => {}
// 이렇게만 쓰면 {} 부분이 함수 본문인지 객체인지 구분이 안되기 때문에
// ({}) 이렇게 묶어줘서 return값이 객체임을 확실히
const tsFunc = ( parameter : string ) : Test2 => ( {} )
