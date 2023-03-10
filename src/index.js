import React from 'react';
import ReactDOM from 'react-dom/client';
import Routers from './Routers';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from "react-auth-kit";

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
              <AuthProvider authType="cookie" authName="_auth" cookieDomain={window.location.hostname} cookieSecure={false} >
                  <Routers/>
              </AuthProvider>
          </PersistGate>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
