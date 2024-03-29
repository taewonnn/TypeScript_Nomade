import { atom, selector } from 'recoil';

/** Interface Start */

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

// type categories = 'TO_DO' | 'DOING' | 'DONE';

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

/** Interface End */

/** 사용자가 현재 선택한 카테고리를 저장 */
export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: ' toDo',
  default: [],
});

/** selector : state을 가져와서 조금 변형해주는 함수 /   atoms의 output을 변형시키는 도구 */
export const toDoSelector = selector({
  key: 'toDoSelector',
  /** get -> selector가 어떤 것을 반환할지 결정 */
  get: ({ get }) => {
    /** 모든 toDOs 받아오기 */
    const toDos = get(toDoState);
    console.log('selector get 확인 :', toDos);

    /** category 가져오기 */
    const category = get(categoryState);
    // console.log('카테고리 : ', category);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
