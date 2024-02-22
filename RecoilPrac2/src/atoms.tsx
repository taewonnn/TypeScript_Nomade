import { atom } from 'recoil';

/** Interface Start */
interface IToDoState {
  [key: string]: string[];
}
/** Interface End */

export const toDoState = atom<IToDoState>({
  key: 'todo',
  default: {
    to_do: ['a', 'b'],
    doing: ['c', 'd', 'e'],
    done: ['f'],
  },
});
