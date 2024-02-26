import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from './Home';
import Tv from './Tv';

import Search from './Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/Tv',
    element: <Tv />,
  },
  {
    path: '/search',
    element: <Search />,
  },
]);
export default router;
