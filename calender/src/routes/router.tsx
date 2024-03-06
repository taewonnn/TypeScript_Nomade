import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Calendar from '../pages/Calendar';
import Home from '../pages/Home';
import Asset from '../pages/Asset';
import Info from '../pages/Info';
import PublicHome from '../pages/PublicHome';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

// 로그인 한 유저 라우터
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

// 로그인 안 한 유저들을 위한 라우트
export const routesForNotAuthenticatedOnly = createBrowserRouter([
  {
    path: '/',
    element: <PublicHome />,
    children: [
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },
]);
