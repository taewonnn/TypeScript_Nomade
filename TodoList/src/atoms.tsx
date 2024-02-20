import { atom, selector } from 'recoil';

/** Interface Start */
export interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO' | 'DOING' | 'DONE';
}
/** Interface End */

export const toDoState = atom<IToDo[]>({
  key: ' toDo',
  default: [],
});

// selector : atoms의 output을 변형시키는 도구
export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    return 'hello';
  },
});
