import { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AccessTokenProvider } from './contexts/AccessTokenContext';
import Router from './routing/Router';

function App() {

  return (
    <BrowserRouter>
      <AccessTokenProvider>
        <Router />
      </AccessTokenProvider>
    </BrowserRouter>
  );
}

export default App
