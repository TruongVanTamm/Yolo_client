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
import {
  transitions,
  positions,
  types,
  Provider as AlertProvider,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
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

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  type: types.ERROR,
};

function App() {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <AlertProvider
        template={AlertTemplate}
        {...options}
      >
        <DataProvider>
          <Layout></Layout>
        </DataProvider>
      </AlertProvider>
    </Suspense>
  );
}
if (window.self === window.top) {
  root.render(<App />);
} else {
  root.render(<UnsecuredPage />);
}
