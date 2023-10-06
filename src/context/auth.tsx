import { Admin } from "@shared/types/admin";
import { trpc } from "@web/api/trpc";
import Redirect from "@web/components/Redirect";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<Admin | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const profile = trpc.auth.profile.useQuery();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) return;
    console.log("getting ready");

    const timer = setTimeout(() => {
      console.log("setting ready");
      setIsReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [profile.isLoading, isReady]);

  return (
    <AuthContext.Provider value={profile.data ?? null}>
      {profile.isLoading || !isReady ? (
        <p>Loading...</p>
      ) : profile.data ? (
        <>{children}</>
      ) : (
        <Redirect to="/" />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("Cannot use `useAuth` outside `AuthProvider`");
  return auth;
}

export function useOptionalAuth() {
  const profile = trpc.auth.profile.useQuery();

  return profile.data;
}

export function useRedirectAuth(role: "guest" | "admin") {
  const auth = useOptionalAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (role === "guest" && auth) {
      push("/manager");
    }
    if (role === "admin" && !auth) {
      push("/secure/login");
    }
  }, [role, auth, push]);
}
