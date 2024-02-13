// React Qyery
// 1.fetcher 함수 -> fetch promise를 return

// BASE_URL
const BASE_URL = `https://api.coinpaprika.com/v1`;

// coin 목록
export function fetchCoins() {
  // promise 방식
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
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
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) => response.json());
}