import { atom } from 'recoil';

/** Interface Start */
interface IToDoState {
  [key: string]: string[];
}
/** Interface End */

export const toDoState = atom<IToDoState>({
  key: 'todo',
  default: {
    TO_DO: ['a', 'b'],
    Doing: ['c', 'd', 'e'],
    Done: ['f'],
  },
});
