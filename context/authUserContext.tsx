import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { UserType } from "../helpers/types";
import { getUser } from "../helpers/api/user";

export type LoginResult = {
  success: boolean;
  error: string;
  data?: UserCredential;
};

export function isUserComplete(user: UserType) {
  return user.displayName && user.avatar;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const emptyUser: UserType = {
    email: null,
    uid: null,
    avatar: null,
    displayName: null,
    bio: null,
    header: null,
    createdAt: null,
    updatedAt: null,
    schwerpunkte: [],
  };

  const [user, setUser] = useState<UserType>(emptyUser);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user.uid).then((res: UserType | null) => {
          if (res == null) {
            console.log(
              "authUserContext.tsx: user logged in but doc not found"
            );
            setUser(emptyUser);
          } else {
            console.log("authUserContext.tsx: user logged in and doc found");
            setUser({
              ...res,
              email: user.email,
              uid: user.uid,
            });
          }
          setLoading(false);
        });

        console.log("User is signed in.");
        console.log(user);
      } else {
        setUser(emptyUser);
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser(emptyUser);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, setUser }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
