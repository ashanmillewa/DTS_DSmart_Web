import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import Login from '../views/authentication/Login';
/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
/* ****Pages***** */
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const UserAccess = Loadable(lazy(() => import('../views/systems/userAccess/UserAccess')));
// const WareHouse = Loadable(lazy(() => import('../views/systems/wareHouse/WareHouse')));
const WareHouse = Loadable(lazy(() => import('../views/systems/wareHouse/EcomProductList')));
const Employee = Loadable(lazy(() => import('../views/systems/employee/Employee')));
const Supplier = Loadable(lazy(() => import('../views/systems/supplier/Supplier')));
const MaterialCatalogue = Loadable(
  lazy(() => import('../views/systems/material/MaterialCatalogue')),
);
const StoresTransaction = Loadable(
  lazy(() => import('../views/systems/material/StoresTransaction')),
);
const StockBalance = Loadable(lazy(() => import('../views/systems/material/StockBalance')));
const BinCard = Loadable(lazy(() => import('../views/systems/material/BinCard')));
const MatCost = Loadable(lazy(() => import('../views/systems/material/ProjectMaterialCost')));
const GRNDetails = Loadable(lazy(() => import('../views/systems/stores/GRNDetails')));
const MRNDetails = Loadable(lazy(() => import('../views/systems/stores/MRNDetails')));
const MRQDetails = Loadable(lazy(() => import('../views/systems/stores/MRQDetails')));
const PRNDetails = Loadable(lazy(() => import('../views/systems/stores/PRNDetails')));
const MTNDetails = Loadable(lazy(() => import('../views/systems/stores/MTNDetails')));
const Report = Loadable(lazy(() => import('../views/systems/report/RecorderLevelTable')));
const ProjectManagement = Loadable(
  lazy(() => import('../views/systems/projectManagement/ProjectDetails')),
);

// const CheckedLoginStatus = () => {
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const refreshStatus = localStorage.getItem('logedinkey');
//     if (refreshStatus) {
//       axios.defaults.headers.common['auth-key'] = JSON.parse(localStorage.getItem('user')).AuthKey;
//       dispatch(setLoginStatus({ isLoggedIn: refreshStatus === 'true' }));
//     }
//   }, [dispatch]);
//   return isLoggedIn ? <FullLayout /> : <Login />;
// };

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <ModernDash /> },
      { path: '/systems/userAccess/UserAccess', element: <UserAccess /> },
      // { path: '/systems/wareHouse/', element: <WareHouse /> },
      { path: '/systems/wareHouse/EcomProductList', element: <WareHouse /> },
      { path: '/systems/employee/Employee', element: <Employee /> },
      { path: '/systems/supplier/Supplier', element: <Supplier /> },
      { path: '/systems/material/MaterialCatalogue', element: <MaterialCatalogue /> },
      // { path: '/systems/material/StoresTransaction', element: <StoresTransaction /> },
      { path: '/systems/material/StockBalance', element: <StockBalance /> },
      { path: '/systems/material/BinCard', element: <BinCard /> },
      { path: '/systems/material/MatCost', element: <MatCost /> },
      { path: '/systems/stores/GRNDetails', element: <GRNDetails /> },
      { path: '/systems/stores/MRNDetails', element: <MRNDetails /> },
      { path: '/systems/stores/MRQDetails', element: <MRQDetails /> },
      { path: '/systems/stores/PRNDetails', element: <PRNDetails /> },
      { path: '/systems/stores/MTNDetails', element: <MTNDetails /> },
      { path: '/systems/stores/StoresTransaction', element: <StoresTransaction /> },
      { path: '/systems/projectManagement/ProjectDetails', element: <ProjectManagement /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/systems/report/Report', element: <Report /> },
    ],
  },
  // {
  //   path: '/auth',
  //   element: <BlankLayout />,
  //   children: [
  //     { path: '404', element: <Error /> },
  //     { path: '*', element: <Navigate to="/auth/404" /> },
  //   ],
  // },
];

const AuthRouter = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/*', element: <Navigate to="/" /> },
      { path: '/', element: <Login /> },
    ],
  },
];

export { AuthRouter, Router };

