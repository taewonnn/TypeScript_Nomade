import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Calendar from '../pages/Calendar';
import Home from '../pages/Home';
import Asset from '../pages/Asset';
import Info from '../pages/Info';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/asset',
        element: <Asset />,
      },
      {
        path: '/info',
        element: <Info />,
      },
    ],
  },
]);

/** 
 * 🛠️ 추후 로그인 구현 후 로그인한 유저 / 로그인 안한 유저 분리 라우터 적용 
// 로그인 안 한 유저들을 위한 라우트
export const routesForNotAuthenticatedOnly = [
  {
    path: '/',
    element: <PublicHome />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
];

// 로그인 한 유저들을 위한 라우트
export const routesForAuthenticatedOnly = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
];
 */
