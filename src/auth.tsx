import * as React from "react";
import { Navigate, useLocation } from "react-router";
import { WALLET } from "./models/walletModel";


interface AuthContextType {
  wallet: any;
  signin: (wallet: WALLET, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [wallet, setWallet] = React.useState<any>(null);

  let signin = (newWallet: WALLET, callback: VoidFunction) => {
    return walletAuthProvider.signin(() => {
      setWallet(newWallet);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return walletAuthProvider.signout(() => {
      setWallet(null);
      callback();
    });
  };

  let value = { wallet, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const walletAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    walletAuthProvider.isAuthenticated = true;
    callback()
  },
  signout(callback: VoidFunction) {
    walletAuthProvider.isAuthenticated = false;
    callback()
  }
};
function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.wallet) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export { AuthProvider, useAuth, RequireAuth };