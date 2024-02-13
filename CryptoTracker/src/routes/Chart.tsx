import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import { useOutletContext } from 'react-router-dom';

/** interface Start */
interface IChartProps {
  coinId: string;
}
/** interface End */

function Chart() {
  // coinId 받기 - useOutletContext
  // useOutletContext : Outlet component 상황에 대한 context를 전달하는 데 사용
  // console.log(useOutletContext());
  const {coinId} = useOutletContext<IChartProps>();

  // useQuery
  const { isLoading, data } = useQuery(['chartPrice', coinId], () => fetchCoinHistory(coinId));
  console.log('chartPrice : ',data)
  return <h1>Chart</h1>;
}

export default Chart;
