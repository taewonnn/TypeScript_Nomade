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
  return fetch(`${BASE_URL}/${coinId}/tickers`)
    .then((response) => response.json())
    .then((json) => {
      json.tickers = json.tickers.filter((ticker: any) => ticker.market.name === 'Binance');
      return json;
    });
}

// coin 가격 기록
export function fetchCoinHistory(coinId: string | undefined) {
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) =>
    response.json()
  );
}

/** 참고 */
// const BASE_URL = `https://api.coinpaprika.com/v1`;
// const CRYPTO_COMPARE_HIST_URL = `https://min-api.cryptocompare.com/data/v2/histoday?`;
// const CRYPTO_COMPARE_PRICE_URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD`;

// const NICO_API = `https://ohlcv-api.nomadcoders.workers.dev?coinId=`;

// export function fetchCryptos() {
// 	return fetch(`${BASE_URL}/coins`).then((response) => response.json());
// }

// export function fetchCryptosFromCoinGecko() {
// 	return fetch(
// 		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`
// 	).then((response) => response.json());
// }

// export function fetchCryptoInfo(cryptoId: string) {
// 	return fetch(
// 		`https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false`
// 	).then((response) => response.json());
// }

// export function fetchCryptoTickers(cryptoId: string) {
// 	return fetch(`${BASE_URL}/tickers/${cryptoId}`).then((response) =>
// 		response.json()
// 	);
// }

// export function fetchMarketChart(cryptoId: string, from: string, to: string) {
// 	return fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}
// 	`);
// }

// export function fetchCoinHistory(cryptoId: string, days: string) {
// 	//const endDate = Math.floor(Date.now() / 1000);
// 	//const startDate = endDate - 60 * 60 * 24 * 7; //one week ago
// 	//console.log("endDate: ", endDate, "startDate: ", startDate);
// 	return fetch(
// 		`https://api.coingecko.com/api/v3/coins/${cryptoId}/ohlc?vs_currency=usd&days=${days}
// 		`
// 	).then((response) => response.json());
// }

// export function fetchAllCoinPrice(cryptoSymbols: string | undefined) {
// 	const link = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSymbols}&tsyms=USD`;
// 	return fetch(
// 		`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSymbols}&tsyms=USD`
// 	).then((response) => response.json());
// }

//`${CRYPTO_COMPARE_URL}/?fsym=${cryptoSymbol}&tsym=USD&limit=20`
