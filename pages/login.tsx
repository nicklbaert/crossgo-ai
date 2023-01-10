import { UserCredential } from "firebase/auth";
import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import { AppLayout } from "../components/app_layout/app_layout";
import { ActionButton } from "../components/buttons/ActionButton";
import { BasicInputField } from "../components/input_fields/basic/input_field";
import { Layout } from "../components/layout/layout";
import { Spacer } from "../components/spacer/Spacers";
import { getFirebaseErrorTranslation } from "../config/firebase_errors";
import { isUserComplete, useAuth } from "../context/authUserContext";
import styles from "../styles/Login.module.css";

const LoginPage: NextPage = ({
  makeSwitch,
  social,
}: {
  makeSwitch?: () => void;
  social?: boolean;
}) => {
  let router = useRouter();

  let redirect = router.query.redirect as string;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null as string | null);

  const { logIn, user } = useAuth();

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      let user: UserCredential = await logIn(email, password);
      console.log(user.user.email);
      //router.push("/dashboard");
    } catch (error: any) {
      let e = getFirebaseErrorTranslation(error.code);
      setError(
        e.toClient !== "default"
          ? e.toClient
          : "Etwas ist schief gelaufen. Bitte versuche es erneut."
      );
      console.log(e.toDev);
    }
    setLoading(false);
  };

  function pushAndClearStack(route: string) {
    router.push(route);
    Router.events.on("routeChangeComplete", () => {
      window.history.replaceState(null, "", window.location.href);
    });
  }

  useEffect(() => {
    console.log("login user change detected ", user);
    if (user.uid) {
      if (redirect !== undefined && redirect !== null && redirect !== "/login" && redirect !== "") {
        pushAndClearStack(redirect);
      } else {
        if (!isUserComplete(user)) {
          pushAndClearStack("/profile/settings");
        } else {
          pushAndClearStack("/dashboard");
        }
      }
    }
  }, [redirect, router, user]);

  return (
    <Layout
      makeSwitch={makeSwitch}
      social={social}
      content={
        <div className={styles.wrapper + " page"}>
          <div className={styles.bg}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/pyro-development.appspot.com/o/bg_element.png?alt=media&token=bc474d4e-a12f-4020-ab36-9059cc7fe1a8"
              alt="bg"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.login_box}>
              <div className={styles.login_box_header}>
                Bei deinem Konto anmelden
              </div>
              <Spacer type="vertical" size={32} />
              <BasicInputField
                label="Email Adresse"
                onChange={(s: string) => {
                  setEmail(s);
                }}
              />
              <Spacer type="vertical" size={24} />
              <BasicInputField
                isPassword={true}
                label="Passwort"
                onChange={(s: string) => {
                  setPassword(s);
                }}
              />
              <Spacer type="vertical" size={32} />
              <div className={styles.sub_row}>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.forgot_password}>Passwort vergessen</div>
              </div>
              <Spacer type="vertical" size={32} />
              <div className={styles.row}>
                <ActionButton
                  height={"50px"}
                  width={"100%"}
                  onClick={onSubmit}
                  loading={loading}
                  title="Einloggen"
                />
              </div>
              <div className={styles.signup_cta}>
                Du hast noch kein Konto?{" "}
                <span
                  className={styles.signup_cta_link}
                  onClick={() => {
                    router.push(`/signup?redirect=${redirect}`);
                  }}
                >
                  Jetzt registrieren
                </span>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default LoginPage;
