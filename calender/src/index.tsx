import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router, routesForNotAuthenticatedOnly } from './routes/router';
import { RecoilRoot } from 'recoil';

// 로그인 상태를 확인하는 함수 또는 상태
const isLoggedIn = () => {
  var user = 1;
  if (user) {
    return true;
  }
  return false;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={isLoggedIn() ? router : routesForNotAuthenticatedOnly} />
    </RecoilRoot>
  </React.StrictMode>
);
