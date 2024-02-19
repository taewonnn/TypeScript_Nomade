import { atom } from 'recoil';

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
