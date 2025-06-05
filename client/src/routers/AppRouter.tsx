import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSessionContext } from '../contexts/SessionContext';
import OnlineRouter from './OnlineRouter';
import OfflineRouter from './OfflineRouter';

/**
 * AppRouter choisit dynamiquement entre OnlineRouter et OfflineRouter
 * en fonction de l’état isAuthenticated (restauré par SessionContext au démarrage).
 */
const AppRouter: React.FC = () => {
  const { isAuthenticated } = useSessionContext();

  return (
    <RouterProvider router={isAuthenticated ? OnlineRouter : OfflineRouter} />
  );
};

export default AppRouter;
