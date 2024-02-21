import { atom, selector } from 'recoil';

/** Interface Start */
export interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO' | 'DOING' | 'DONE';
}
/** Interface End */

/** 사용자가 현재 선택한 카테고리를 저장 */
export const categoryState = atom({
  key: 'category',
  default: 'TO_DO',
});

export const toDoState = atom<IToDo[]>({
  key: ' toDo',
  default: [],
});

/** selector : atoms의 output을 변형시키는 도구 */
export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    /** 모든 toDOs 받아오기 */
    const toDos = get(toDoState);
    console.log('selector get 확인 :', toDos);

    /** category 가져오기 */
    const category = get(categoryState);
    console.log('카테고리 : ', category);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
