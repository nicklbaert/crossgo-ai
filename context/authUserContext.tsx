import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { getUser } from "../helpers/api_wrapper";

export interface UserType {
  email: string | null;
  uid: string | null;
  avatar: string | null;
  displayName: string | null;
  bio: string | null;
  header: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

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
  const [user, setUser] = useState<UserType>({
    email: null,
    uid: null,
    avatar: null,
    displayName: null,
    bio: null,
    header: null,
    createdAt: null,
    updatedAt: null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user.uid).then((res) => {
          if (res == null) {
            console.log(
              "authUserContext.tsx: user logged in but doc not found"
            );
            setUser({
              email: null,
              uid: null,
              avatar: null,
              displayName: null,
              bio: null,
              header: null,
              createdAt: null,
              updatedAt: null,
            });
          } else {
            console.log("authUserContext.tsx: user logged in and doc found");
            setUser({
              email: user.email,
              uid: user.uid,
              avatar: res.avatar,
              displayName: res.displayName,
              bio: res.bio,
              header: res.header,
              createdAt: res.createdAt,
              updatedAt: res.updatedAt,
            });
          }
          setLoading(false);
        });

        console.log("User is signed in.");
        console.log(user);
      } else {
        setUser({
          email: null,
          uid: null,
          avatar: null,
          displayName: null,
          bio: null,
          header: null,
          createdAt: null,
          updatedAt: null,
        });
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
    setUser({
      email: null,
      uid: null,
      avatar: null,
      displayName: null,
      bio: null,
      header: null,
      createdAt: null,
      updatedAt: null,
    });
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, setUser }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
