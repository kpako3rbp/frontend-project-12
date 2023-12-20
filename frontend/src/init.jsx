import React from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import * as Rollbar from '@rollbar/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.jsx';
import resources from './locales/index.js';
import AuthProvider from './app/providers/AuthProvider';
import SocketProvider from './app/providers/SocketProvider';

import store from './slices';

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
    <Rollbar.Provider config={rollbarConfig}>
      <Rollbar.ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <SocketProvider>
                <App />
              </SocketProvider>
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      </Rollbar.ErrorBoundary>
    </Rollbar.Provider>
  );
};

export default init;
