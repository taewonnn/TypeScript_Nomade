import { useLocation } from 'react-router-dom';

function Search() {
  /** useLoaction - url 정보 */
  const location = useLocation();
  console.log(location);
  /** useLoaction */

  return <div>Search</div>;
}

export default Search;
