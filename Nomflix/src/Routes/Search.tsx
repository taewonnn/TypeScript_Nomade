import { useLocation } from 'react-router-dom';

function Search() {
  /** useLoaction - url 정보 */
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  console.log('keyword 가져오기 : ', keyword);
  /** useLoaction */

  return <div>Search</div>;
}

export default Search;
