// React Qyery
// 1.fetcher 함수 -> fetch promise를 return

/** 
- Market Cap순으로 50개 뽑아오기
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1

- 코인 정보 불러오기
https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false

- ohlcv 불러오기
https://api.coingecko.com/api/v3/coins/${cryptoId}/ohlc?vs_currency=usd&days=${days}
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

// coin 정보 - 유료 API
export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}

// coin 정보 - nomade API
export function fetchCoinInfo2(coinId: string | undefined) {
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then((response) =>
    response.json()
  );
}

// coin 가격
export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}
// coin 가격 기록
export function fetchCoinHistory(coinId: string | undefined) {
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) =>
    response.json()
  );
}
