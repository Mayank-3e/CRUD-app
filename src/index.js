import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FormState from './context/FormState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FormState>
      <App/>
    </FormState>
  </React.StrictMode>
);
