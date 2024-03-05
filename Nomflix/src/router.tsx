import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './Routes/Home/Home';
import Home2 from './Routes/Home/Home2';
import Tv from './Routes/Tv/Tv';

import Search from './Routes/Search/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home2 />,
      },
      {
        path: '/movies/:movieId',
        element: <Home2 />,
      },
      {
        path: '/Tv',
        element: <Tv />,
      },
      {
        path: '/search',
        element: <Search />,
      },
    ],
  },
]);
export default router;
