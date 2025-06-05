import { createBrowserRouter } from 'react-router-dom';
import HomeOffline from '../screens/OfflineScreens/HomeOffline';
import Login from '../screens/OfflineScreens/Login';
import Register from '../screens/OfflineScreens/Register';
import PageError from '../screens/ErrorScreens/PageError';

/**
 * Routes accessibles lorsque l’utilisateur n’est pas authentifié :
 * - HomeOffline : layout commun pour les pages Login / Register
 * - Login : formulaire de connexion
 * - Register : formulaire d’inscription
 * - PageError : affiché en cas d’erreur de route
 */
const OfflineRouter = createBrowserRouter([
  {
    element: <HomeOffline />, 
    errorElement: <PageError />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default OfflineRouter;
