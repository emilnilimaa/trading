import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import { RequireAuth } from "./RequireAuth";
import Root from "./Root";

const pages: any[] = [];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <Layout>
              <HomePage />
            </Layout>
          </RequireAuth>
        ),
      },
      ...pages,
    ],
  },
]);
export default router;
