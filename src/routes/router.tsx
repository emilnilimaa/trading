import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import StockPage from "../pages/StockPage";
import { RequireAuth } from "./RequireAuth";
import Root from "./Root";

const pages: any[] = [
  {
    path: "/",
    element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: "stock/:id",
    element: <StockPage />, // Does not require auth, but with auth shows extra components
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: pages,
  },
]);
export default router;
