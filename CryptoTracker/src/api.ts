// React Qyery
// 1.fetcher 함수 -> fetch promise를 return

// coin 목록
export function fetchCoins() {
  // async/await 방식
  // const response = await fetch('https://api.coinpaprika.com/v1/coins');
  // const json = await response.json;
  // console.log(json);

  // promise 방식
  return fetch('https://api.coinpaprika.com/v1/coins').then((response) => response.json());
}
