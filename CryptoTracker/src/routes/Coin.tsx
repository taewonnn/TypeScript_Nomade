import styled from 'styled-components';
import { Link, useLocation, useParams, Outlet, useMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from '../api';

/** style Start */
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  a {
    display: block;
  }
`;
/** style End */

/** interface Start */
interface ILocation {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags?: object;
  team?: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links?: object;
  links_extended: object;
  whitepaper?: object;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}
/** interface End */

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

  // Coin에서 coindata 받아온 것 중 일부만 가져오기
  // <Link to={`/${coin.id}`} state={{ name: coin.name, rank: coin.rank }}>
  // Link 속성 중 state로 전달한 것을 받아오기
  const { state } = useLocation() as ILocation;

  // useMatch()  => 너가 특정 url에 있는지 여부 / url이 ()안에 있는 랜딩에 있는지!
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  // react-query 적용
  // 아래는 coinInfo / coinTrickers 두 가지 정보 fetch
  // isLoading / data 중복으로 사용 못하니 각각 구분위해 아래처럼 작성 {isLoaidng: ~Loading, data: ~Data}
  // coin 정보
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(['info', coinId], () =>
    fetchCoinInfo(coinId)
  );

  // coin 가격
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId)
  );

  // loading 두 가지
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? 'Yes' : 'No'}</span>
            </OverviewItem>
          </Overview>

          <Description>{infoData?.description}</Description>

          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          {/* useOutletContext -> context = {넘겨줄 데이터} */}
          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}

export default Coin;

// nico 제작 - coin 정보
// https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}

// interface 데이터 가공 Tip

// Ex.
// 1. console에서 Fetch Data를 확인 -> console.log('info : ', infoData);
// 2. 전역 객체로 저장 -> temp1 변수로 저장
// 3. Object.keys(temp1) -> temp1의 key값만 가져오기  / Object.values(temp1) -> temp1의 Values값만 가져오기

//  Object.keys(temp1)
// 4. Object.keys(temp1).join() -> key값을 문자열로 가져옴

// Object.values(temp1)
// 4. Object.values(temp1).map(v => typeof v) -> temp1의 타입들을 배열로 가져옴
// 5. Object.values(temp1).map(v => typeof v).join() -> temp1의 타입들을 문자열 형태로 가져옴
// 단축키 : option + shift + i

// ?
// info가 존재하는 경우에만 rank를 찾아라
// <span>{info?.rank}</span>
