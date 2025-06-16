import { createBrowserRouter } from 'react-router-dom'
import HomeOffline from '../screens/OfflineScreens/HomeOffline'
import Login from '../screens/OfflineScreens/Login'
import Register from '../screens/OfflineScreens/Register'
import PageError from '../screens/ErrorScreens/PageError'


/**
 * Routes accessibles lorsque l’utilisateur n’est pas authentifié :
 * - HomeOffline : page acceuil hors ligne
 * - Login : formulaire de connexion
 * - Register : formulaire d’inscription
 * - PageError : affiché en cas d’erreur de route
 */

const OfflineRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomeOffline />,
    errorElement: <PageError />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <PageError />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <PageError />,
  },
  {
    path: '*',            // catch-all pour toute autre route
    element: <PageError />,
  },
])

export default OfflineRouter



