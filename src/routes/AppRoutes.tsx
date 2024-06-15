import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../domains/dashboard/Dashboard";
import Bookings from "../domains/bookings/Bookings";

import NewUsers from "../pages/Users";
import Settings from "../domains/settings/Settings";
import Account from "../pages/Account";
import Login from "../pages/Login";
import PageNotFound from "../shared/pages/PageNotFound";
import AppLayout from "../shared/components/AppLayout";
import Cabins from "../domains/cabins/Cabins";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
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
