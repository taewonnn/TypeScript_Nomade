// React Qyery
// 1.fetcher 함수 -> fetch promise를 return

/** 
- Market Cap순으로 50개 뽑아오기
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1

- 코인 정보 불러오기
https://api.coingecko.com/api/v3/coins/${coinId}?localization=false

- ticker 불러오기
https://api.coingecko.com/api/v3/coins/${coinId}/tickers

*/

// BASE_URL
const BASE_URL = `https://api.coingecko.com/api/v3/coins`;

// coin 목록
export function fetchCoins() {
  // promise 방식
  return fetch(`${BASE_URL}/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`).then(
    (response) => response.json()
  );
}

// coin 정보
export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/${coinId}?localization=false`).then((response) => response.json());
}

// coin tickers
export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${BASE_URL}/${coinId}/tickers`).then((response) => response.json());
  // .then((json) => {
  //   json.tickers = json.tickers.filter((ticker: any) => ticker.market.name === 'Binance');
  //   return json;
  // });
}

// coin 가격 기록
export function fetchCoinHistory(coinId: string | undefined) {
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) =>
    response.json()
  );
}
