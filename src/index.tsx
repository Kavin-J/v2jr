import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

async function enableMocking() {
  if (!import.meta.env.VITE_USE_MSW) {
    return
  }

  const { worker } = await import('./utils/test/mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests
  return worker.start()
}

enableMocking().then(() => {
  console.log('Mocking enabled')
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </Provider>
    </React.StrictMode>
  );
})