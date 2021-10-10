import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloProvider } from '@apollo/client'
import createApolloClient from './utils/apolloClient';
import AuthStorage from './utils/authStorage';
import AuthStorageContext from './contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <AuthStorageContext.Provider value={authStorage}>
      <App />
    </AuthStorageContext.Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
