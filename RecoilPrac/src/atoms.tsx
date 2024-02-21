import { atom, selector } from 'recoil';

/** Interface Start */

/** Interface End */

export const minuteState = atom({
  key: 'minutes',
  default: 0,
});

/** state를 가져오고 output 수정 */
export const hoursSelector = selector({
  key: 'hours',
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
});
