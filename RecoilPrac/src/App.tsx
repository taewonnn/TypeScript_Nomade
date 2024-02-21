import { useRecoilState, useRecoilValue } from 'recoil';
import { hoursSelector, minuteState } from './atoms';
import React from 'react';

function App() {
  /** minutes 값 / 값을 바꾸는 함수 가져오기 */
  const [minutes, setMinutes] = useRecoilState(minuteState);

  /** hours 값 가져오기 */
  //const hours = useRecoilValue(hoursSelector);
  const [hours, setHours] = useRecoilState(hoursSelector);

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    // value는 문자열 / atom에서 minutes 기본값을 0 으로 해놔서 Number로 넘겨줘야한다.
    // 💡 string을 number로 바꾸기 : +
    // Ex.  +'1'  => 1
    setMinutes(+value);
  };

  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setHours(+value);
  };

  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minutes" />
      <input value={hours} onChange={onHoursChange} type="number" placeholder="Hours" />
    </div>
  );
}

export default App;
