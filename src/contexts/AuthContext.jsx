import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/initializeApp";

const AuthContext = createContext(),
  useAuthContext = () => {
    return useContext(AuthContext);
  },
  // eslint-disable-next-line react/prop-types
  AuthContextProvider = ({ children }) => {
    const [UserData, setUserData] = useState(undefined),
      [LoadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
      const unsub = () =>
        onAuthStateChanged(auth, (user) => {
          setUserData(user || null);
          setLoadingUser(false);
        });
      return () => unsub();
    }, []);

    return (
      <AuthContext.Provider value={{ UserData, LoadingUser }}>
        {children}
      </AuthContext.Provider>
    );
  };

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContextProvider, useAuthContext };
