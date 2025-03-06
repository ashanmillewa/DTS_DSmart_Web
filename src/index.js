import axios from 'axios';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './store/auth/authContext.js';
import { store } from './store/Store';
import './utils/i18n';
import Spinner from './views/spinner/Spinner';
axios.defaults.baseURL = 'https://esystems.cdl.lk/backend-Test/DSMartWeb/';
// axios.defaults.baseURL = 'http://localhost:51324/';
axios.defaults.headers.common['auth-key'] = JSON.parse(localStorage.getItem('DSM_Token'));
axios.defaults.headers.common['Content-Type'] = 'application/json';
console.log(JSON.parse(localStorage.getItem('DSM_Token')));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </Suspense>
  </Provider>,
);
