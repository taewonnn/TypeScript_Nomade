import { atom, selector } from 'recoil';

/** Interface Start */

/** Interface End */

export const toDoState = atom({
  key: 'todo',
  default: ['a', 'b', 'c', 'd', 'e', 'f'],
});
