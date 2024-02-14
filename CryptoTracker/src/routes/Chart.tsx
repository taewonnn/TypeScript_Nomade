import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import { useOutletContext } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';

/** interface Start */
interface IChartProps {
  coinId: string;
}

interface IChartPrice {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
/** interface End */

function Chart() {
  // coinId 받기 - useOutletContext
  // useOutletContext : Outlet component 상황에 대한 context를 전달하는 데 사용
  // console.log(useOutletContext());
  const { coinId } = useOutletContext<IChartProps>();

  // useQuery
  const { isLoading, data } = useQuery<IChartPrice[]>(['chartPrice', coinId], () =>
    fetchCoinHistory(coinId)
  );
  // console.log('chartPrice : ', data);
  return (
    <div>
      {isLoading ? (
        'Loading Chart...'
      ) : (
        <ApexCharts
          type="line"
          series={[
            // data 넣는 예시
            // { name: 'hello', data: [1, 2, 3] },
            // data가 null이 되는걸 방지하기 위해 ?? [] -> null 대신 빈 배열로 바꿔주기
            { name: 'sales', data: data?.map((price) => parseFloat(price.close)) ?? [] },
          ]}
          options={{
            theme: { mode: 'dark' },
            chart: { height: 500, width: 500, toolbar: { show: false } },
            stroke: { curve: 'smooth', width: 3 },
            fill: { type: 'gradient', gradient: { gradientToColors: ['blue'], stops: [0, 100] } },
            colors: ['red'],
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: { show: false },
              type: 'datetime',
              categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()),
            },
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
