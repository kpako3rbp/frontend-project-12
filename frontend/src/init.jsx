import React from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider, ErrorBoundary } from '@rollbar/react';
import App from './App.jsx';
import resources from './locales/index.js';

const rollbarConfig = {
  accessToken: '46e844f507f84a488eec74555e632cb2',
  environment: 'testenv',
};

const init = async () => {
  const defaultLanguage = 'ru';
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
