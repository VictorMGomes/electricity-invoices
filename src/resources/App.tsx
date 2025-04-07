import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeadManager } from './components/HeadManager';
import AppBar from './components/AppBar';
import AboutPage from './pages/AboutPage';
import BillPage from './pages/BIllPage';
import ClientPage from './pages/ClientPage';
import { getAvailablePages } from './constants/availablePages';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.css';
import './config/i18n.ts';
import AuthorCreditBar from './components/AuthorCreditBar.tsx';
import UploadPage from './pages/UploadPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';

const componentMap: Record<string, React.ReactNode> = {
  DashboardPage: <DashboardPage />,
  AboutPage: <AboutPage />,
  BillPage: <BillPage />,
  ClientPage: <ClientPage />,
  UploadPage: <UploadPage />,
};

function App() {
  const { t } = useTranslation();
  const availablePages = getAvailablePages(t);

  return (
    <BrowserRouter>
      <HeadManager />
      <AuthorCreditBar />
      <AppBar />
      <Routes>
        {availablePages.map(({ path, component }) => (
          <Route key={path} path={path} element={componentMap[component]} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
