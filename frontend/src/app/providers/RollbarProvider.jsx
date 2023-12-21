import * as Rollbar from '@rollbar/react';
import React from 'react';

const rollbarConfig = {
  accessToken: '46e844f507f84a488eec74555e632cb2',
  environment: 'testenv',
};

const RollbarProvider = ({ children }) => (
  <Rollbar.Provider config={rollbarConfig}>
    <Rollbar.ErrorBoundary>
      {children}
    </Rollbar.ErrorBoundary>
  </Rollbar.Provider>
);

export default RollbarProvider;
