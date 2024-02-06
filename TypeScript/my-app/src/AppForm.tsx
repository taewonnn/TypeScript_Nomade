import { useState } from 'react';

function AppForm() {
  const [value, setValue] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    console.log('Event', event.currentTarget);
    // console.log('Event.currentTarget', event);
    //  Destructuring Assignment => const value = event.currentTarget.value;
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`hello! ${value}`);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} type="text" placeholder="username" />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default AppForm;

// 구조 분해 할당 - Destructuring Assignment
// 💡Obj
const bob = {
  name: 'Bob',
  age: 20,
  job: 'developer',
};

const { name, age, job } = bob;

console.log(name); // "Bob"
console.log(age); // 20
console.log(job); // "developer"

// 💡Arr
const numbers = [1, 2, 3, 4, 5];

const [first, second, , , fifth] = numbers;

console.log(first); // 1
console.log(second); // 2
console.log(fifth); // 5

// 💡중첩
const event1 = {
  bubbles: true,
  cancelBubble: false,
  cancelable: true,
  currentTarget: {
    value: 'user input', // input field의 현재 값
    // 또한 다른 많은 properties와 methods
  },
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: true,
  target: {
    value: 'user input', // currentTarget과 같을 것이지만 버블링 과정에서 달라질 수 있음
    // 또한 다른 많은 properties와 methods
  },
  timeStamp: 123456789,
  type: 'change',
  // 또한 다른 많은 properties와 methods
};

const {
  currentTarget: { value },
} = event1;

console.log(value); // user input

// 💡중첩
const numbers2 = [
  [1, 2],
  [3, 4],
];

const [[first1, second2], [third, fourth]] = numbers2;

console.log(first1); // 1
console.log(second2); // 2
console.log(third); // 3
console.log(fourth); // 4
