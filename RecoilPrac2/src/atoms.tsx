import { atom } from 'recoil';

/** Interface Start */
interface IToDoState {
  [key: string]: string[];
}
/** Interface End */

export const toDoState = atom<IToDoState>({
  key: 'todo',
  default: {
    // To Do에만 '' 붙는 이유 -> To Do 사이 공백 때문
    'To Do': ['a', 'b'],
    Doing: ['c', 'd', 'e'],
    Done: ['f'],
    'Do Later': ['x', 'z'],
  },
});
