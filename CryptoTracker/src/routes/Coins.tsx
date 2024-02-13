import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';

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

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  a {
    padding: 20px;
    transition: color 0.3s ease-in;
    /* display: block; */
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

// coin data type
interface Icoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // react Query 적용
  // @tanstack/react-query -> useQuery(['queryKey], fetcher함수)
  // 💡 useQuery는 isLoading이라는 boolean값을 return한다 -> fetcher함수가 끝난다면 fetcher함수에서 return한 json을 data에 저장해준다!
  const { isLoading, data } = useQuery<Icoin[]>(['allcoins'], fetchCoins);
  console.log(data);

  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => {
            return (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name, rank: coin.rank }}>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                    alt="coinImg"
                  ></Img>
                  {coin.name} &rarr;
                </Link>
              </Coin>
            );
          })}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;

// 함수 즉시 실행 가능 트릭 ->
// (() => console.log(1))();
