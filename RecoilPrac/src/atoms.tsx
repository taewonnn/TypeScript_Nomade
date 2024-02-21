import { atom, selector } from 'recoil';

/** Interface Start */

/** Interface End */

export const minuteState = atom({
  key: 'minutes',
  default: 0,
});

/** state를 가져오고 output 수정 */
/** slector 사용 이유?? -> 하나의 state(minuteState) 가지고 바꾸기 위해 */
export const hoursSelector = selector<number>({
  key: 'hours',
  /** get -> selector가 어떤 것을 반환할지 결정 */
  /** ({get}) -> atoms의 값을 가져올 수 있다! */
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  /** set -> state를 set하는 것을 도와준다. */
  /** set(수정하고 싶은 atom, 새로운 값 ) */
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
