import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AuthContextProvider } from './contexts/AuthContext';
import { SessionContextProvider } from './contexts/SessionContext';
import store from './redux/store';
import AppRouter from './routers/AppRouter';
import './App.css'; // ou App.css selon votre config (pour Tailwind)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider> {/* contexte d'authentification */}
      <SessionContextProvider> {/* contexte de session (online/offline) */}
        <Provider store={store}> {/* accès au store Redux */}
          <AppRouter /> {/* routeur de l’application */}
        </Provider>
      </SessionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
