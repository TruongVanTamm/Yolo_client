import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import Layout from './components/Layout/Layout';
import './Asset/boxicons-2.1.2/css/boxicons.min.css';
import './sass/index.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataProvider } from './GlobalState';
import Loading from './components/utils/Loading';
import UnsecuredPage from './components/utils/UnsecuredPage';
const container = document.getElementById('root');
const root = createRoot(container);
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en'],
    fallbackLng: 'vi',
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

function App() {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <DataProvider>
        <Layout />
        <ToastContainer
          position="top-right"
          autoClose={5000}
        />
      </DataProvider>
    </Suspense>
  );
}
if (window.self === window.top) {
  root.render(<App />);
} else {
  root.render(<UnsecuredPage />);
}
