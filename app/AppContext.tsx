"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Toast, UserAuthenticated } from "./AppTypes";
import { useRouter } from "next/navigation";
import { getUserFromToken, logoutUser } from "./AppServices";

type AppContextType = {
  toast: Toast;
  setToast: (toast: Toast) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  user: UserAuthenticated | undefined;
  setUser: (user: UserAuthenticated | undefined) => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType>({
  toast: { message: "", status: "info", show: false },
  setToast: () => {},
  isLoading: false,
  setIsLoading: () => {},
  user: undefined,
  setUser: () => {},
  logout: () => {},
});

export default AppContext;

export function AppContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [toast, setToast] = useState<Toast>({
    message: "",
    status: "info",
    show: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserAuthenticated | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const data = await getUserFromToken();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(undefined);
          router.push("/login");
        }
      } catch (error) {
        setUser(undefined);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  async function logout() {
    try {
      await logoutUser();
      setToast({
        message: "Logout successful!",
        status: "success",
        show: true,
      })
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <AppContext.Provider
      value={{ toast, setToast, isLoading, setIsLoading, user, setUser, logout }}
    >
      {children}
    </AppContext.Provider>
  );
}
