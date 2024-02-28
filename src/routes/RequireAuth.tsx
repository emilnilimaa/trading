import { useAuthStore } from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const authenticated = useAuthStore.use.authenticated();

  if (!authenticated) {
    return <LoginPage />;
  }
  return children;
}
