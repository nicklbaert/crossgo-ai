import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/authUserContext";
import { Spinner } from "./buttons/spinner/Spinner";
import styles from "./ProtectedRoute.module.css";

let timer: NodeJS.Timeout;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    //wait for 2 seconds, then redirect to login page
    wait2SecondsThenIfStillNoUserRedirectToLogin();
  }, [router, user]);

  function wait2SecondsThenIfStillNoUserRedirectToLogin() {
    //cancel timer
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      if (!user.uid) {
        router.push(`/login?redirect=${router.pathname}`);
      }
    }, 2000);
  }

  return (
    <div>
      {user?.uid ? (
        children
      ) : (
        <div className={styles.loading_wrapper}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
