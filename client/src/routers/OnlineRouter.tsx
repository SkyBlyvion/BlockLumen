import { createBrowserRouter } from 'react-router-dom';
//import AppLayout from '../App';
// import Dashboard from '../screens/OnlineScreens/Dashboard';
// import WalletList from '../screens/OnlineScreens/WalletList';
// import WalletDetail from '../screens/OnlineScreens/WalletDetail';
// import TradeHistory from '../screens/OnlineScreens/TradeHistory';
// import Learn from '../screens/OnlineScreens/Learn';
// import Profile from '../screens/OnlineScreens/Profile';
import PageError from '../screens/ErrorScreens/PageError';

/**
 * Routes accessibles une fois connecté :
 * - AppLayout : wrapper principal (Navbar, Sidebar, etc.)
 * - Dashboard : page d’accueil après connexion
 * - WalletList / WalletDetail : gestion des portefeuilles
 * - TradeHistory : historique des transactions
 * - Learn : modules pédagogiques
 * - Profile : mise à jour du profil utilisateur
 * - PageError : en cas d’URL inconnue ou erreur de rendu
 */
const OnlineRouter = createBrowserRouter([
  {
    //element: <AppLayout />,
    errorElement: <PageError />,
    children: [
      {
        path: "/",
        // element: <Dashboard />,
      },
      {
        path: "/wallets",
        // element: <WalletList />,
      },
      {
        path: "/wallets/:walletId",
        // element: <WalletDetail />,
      },
      {
        path: "/trades",
        // element: <TradeHistory />,
      },
      {
        path: "/learn",
        // element: <Learn />,
      },
      {
        path: "/profile",
        // element: <Profile />,
      },
    ],
  },
]);

export default OnlineRouter;
