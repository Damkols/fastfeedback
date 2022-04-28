import React, { useEffect, useState, useContext, createContext } from "react";
import { authGit } from "./firebase-config";
import {
  getAuth,
  signInWithPopup,
  signInWithGithub,
  GithubAuthProvider,
} from "firebase/auth";

const authContext = createContext();

export function AuthProvider({ children, value }) {
  // const auth = useProvideAuth();
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export const useAuthValue = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signInWithGithub = () => {
    return authGit.auth();
    signInWithPopup(new authGit.auth.GithubAuthProvider()).then((response) => {
      setUser(response.user);
      return response.user;
    });
  };

  const signout = () => {
    return authGit
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = authGit.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    userId: user && user.uid,
    signin,
    signout,
  };
}
