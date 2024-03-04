import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './Routes/Home/Home';
import Tv from './Routes/Tv/Tv';

import Search from './Routes/Search/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/movies/:movieId',
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
    ],
  },
]);
export default router;
