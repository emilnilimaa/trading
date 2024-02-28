import LoginPage from "../pages/LoginPage";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const authenticated = false;

  if (!authenticated) {
    return <LoginPage />;
  }
  return children;
}
