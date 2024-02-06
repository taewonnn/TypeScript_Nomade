import { useParams } from 'react-router-dom';

function Coin() {
  // useParams() => url 뒤 파라미터 가져오기
  // <Route path="/:coinId" element={<Coin />}></Route>  -> URL : http://localhost:3000/btc
  // console.log(params) 결과 : {coinId: 'btc'}
  // const params = useParams();
  // console.log(params);

  const { coinId } = useParams();

  return (
    <div>
      <h1>Coin : {coinId}</h1>
    </div>
  );
}

export default Coin;
