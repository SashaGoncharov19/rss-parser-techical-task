import { ADMIN_ROUTE, MAIN_ROUTE } from "./utils/const";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";

export const publicPages = [
  {
    route: MAIN_ROUTE,
    component: <MainPage />,
  },
];

export const adminPages = [
  {
    route: ADMIN_ROUTE,
    component: <AdminPage />,
  },
];
