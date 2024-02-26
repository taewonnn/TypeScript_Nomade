import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './Routes/Home';
import Tv from './Routes/Tv';

import Search from './Routes/Search';

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
