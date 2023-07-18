import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/initializeApp";

const AuthContext = createContext(),
  useAuthContext = () => {
    return useContext(AuthContext);
  },
  // eslint-disable-next-line react/prop-types
  AuthContextProvider = ({ children }) => {
    const [UserData, setUserData] = useState(null),
      [LoadingUser, setLoadingUser] = useState(true),
      getUser = () => {
        onAuthStateChanged(auth, (user) => {
          user && setUserData(user);
          setLoadingUser(false);
        });
      };

    useEffect(() => {
      const unsub = () => getUser();
      return () => unsub();
    }, []);

    return (
      <AuthContext.Provider value={{ UserData, LoadingUser }}>
        {children}
      </AuthContext.Provider>
    );
  };

export { AuthContextProvider, useAuthContext };
