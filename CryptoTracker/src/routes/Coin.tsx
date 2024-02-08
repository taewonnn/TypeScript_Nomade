import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface ILocation {
  state: {
    name: string;
  };
}

function Coin() {
  // 💡useParams() => url 뒤 파라미터 가져오기
  // <Route path="/:coinId" element={<Coin />}></Route>  -> URL : http://localhost:3000/btc
  // console.log(params) 결과 : {coinId: 'btc'}
  // const params = useParams();
  // console.log(params.coinId);

  // 파라미터에서 coinId 가져오기
  const { coinId } = useParams();

  // 💡 useLocation() => 현재 위치한 url object로 전달
  // Ex.  http://localhost:3000/btc-bitcoin 접속 시 console에 아래처럼 나옴
  // {
  //   "pathname": "/btc-bitcoin",
  //   "search": "",
  //   "hash": "",
  //   "state": {
  //       "name": "Bitcoin",
  //       "rank": 1
  //   },
  //   "key": "22z72l4x"
  // }
  // const location = useLocation();
  // console.log(location);

  const { state } = useLocation() as ILocation;

  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 코인 정보
  const [info, setInfo] = useState({});
  // 코인 가격
  const [price, setPrice] = useState({});

  // 코인 정보 + 가격 정보 가져오기
  useEffect(() => {
    (async () => {
      // coin 정보
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      console.log('info : ', infoData);
      // coin 가격 정보
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log('price : ', priceData);

      // data 담아주기
      setInfo(infoData);
      setPrice(priceData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading...'}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;

// nico 제작 - coin 정보
// https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}
