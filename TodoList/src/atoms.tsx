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
    // 모든 toDOs 받아오기
    const toDos = get(toDoState);
    console.log('selector get 확인 :', toDos);
    return [
      // filter는 조건을 만족하는 값 배열로 리턴
      toDos.filter((toDo) => toDo.category === 'TO_DO'),
      toDos.filter((toDo) => toDo.category === 'DOING'),
      toDos.filter((toDo) => toDo.category === 'DONE'),
    ];
  },
});
