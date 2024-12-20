import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from '../features/dashboard/page/Dashboard';
import NewUsers from '../features/authentication/pages/Users';
import Settings from '../features/settings/Settings';
import Account from '../features/authentication/pages/Account';
import Login from '../features/authentication/pages/Login';
import PageNotFound from '../shared/pages/PageNotFound';
import AppLayout from '../shared/components/appLayout/AppLayout';
import Bookings from '../features/bookings/pages/Bookings';
import Cabins from '../features/cabins/page/Cabins';
import Booking from '../features/bookings/pages/Booking';
import Checkin from '../features/check-in-out/pages/Checkin';
import { ProtectedRoute } from '../shared/components';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:bookingId" element={<Booking />} />
          <Route path="checkin/:bookingId" element={<Checkin />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="users" element={<NewUsers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />,
//     errorElement: <PageNotFound />,
//     children: [
//       {
//         index: true,
//         element: <Navigate replace to="dashboard" />,
//       },
//       {
//         index: true,
//         element: <Navigate replace to="dashboard" />,
//       },
//       {
//         path: "/dashboard",
//         element: <Dashboard />,
//       },
//       {
//         path: "bookings",
//         element: <Bookings />,
//       },
//       {
//         path: "cabins",
//         element: <Cabins />,
//       },
//       {
//         path: "users",
//         element: <NewUsers />,
//       },
//       {
//         path: "settings",
//         element: <Settings />,
//       },
//       {
//         path: "account",
//         element: <Account />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//     ],
//   },
// ]);
