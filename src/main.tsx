import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorPage from './error-page.tsx';
import DashboardPage from './routes/DashboardPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu1Page from './routes/Menu1.tsx';
import Menu2Page from './routes/Menu2.tsx';
import Menu3Page from './routes/Menu3.tsx';
import Menu4Page from './routes/Menu4.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'menu1',
        element: <Menu1Page />,
      },
      {
        path: 'menu2',
        element: <Menu2Page />,
      },
      {
        path: 'menu3',
        element: <Menu3Page />,
      },
      {
        path: 'menu4',
        element: <Menu4Page />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
