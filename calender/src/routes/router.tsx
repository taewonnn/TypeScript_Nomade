import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: '',
      },
      {
        path: '/calendar',
        element: '',
      },
      {
        path: '/asset',
        element: '',
      },
      {
        path: '/info',
        element: '',
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
