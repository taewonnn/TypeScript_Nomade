import styled from 'styled-components';
import { Link, useLocation, useParams, Outlet, useMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinInfo } from '../api';
import { Helmet } from 'react-helmet';

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
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: object;
  platforms: object;
  detail_platforms: object;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: object;
  preview_listing: boolean;
  public_notice: object;
  additional_notices: object;
  description: { en: string };
  links: object;
  image: object;
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: {
    current_price: { krw: number };
    total_supply: number;
    max_supply: number;
  };
  community_data: object;
  developer_data: object;
  status_updates: object;
  last_updated: string;
  tickers: object;
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
  // @tanstack/react-query -> useQuery(['queryKey], fetcher함수, 선택적인 obj)
  // isLoading / data 중복으로 사용 못하니 각각 구분위해 아래처럼 작성 {isLoaidng: ~Loading, data: ~Data}

  // coin 정보
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId),
    {
      // 개발용 -> 첫 번째 요청 이후에 추가 요청을 전송X
      staleTime: Infinity,
    }
    // {
    //   // 5초 마다 해당 쿼리를 refetch한다!
    //   refetchInterval: 5000,
    // }
  );
  // infodata 확인
  // console.log('info!!!', infoData);

  return (
    <Container>
      {/* chrome Tab 제목 */}
      <Helmet>
        <title>{state?.name ? state.name : infoLoading ? 'Loading...' : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : infoLoading ? 'Loading...' : infoData?.name}</Title>
      </Header>
      {infoLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.market_cap_rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{infoData?.market_data.current_price.krw}</span>
            </OverviewItem>
          </Overview>

          <Description>{infoData?.description.en}</Description>

          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{infoData?.market_data.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{infoData?.market_data.max_supply}</span>
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
