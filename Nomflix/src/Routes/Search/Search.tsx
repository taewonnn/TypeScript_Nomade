import { useLocation } from 'react-router-dom';
import * as Style from './Search.styles';

function Search() {
  /** useLoaction - url 정보 */
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  console.log('keyword 가져오기 : ', keyword);
  /** useLoaction */

  return <Style.Wrapper></Style.Wrapper>;
}

export default Search;
