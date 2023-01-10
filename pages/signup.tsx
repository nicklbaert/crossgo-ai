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
import { isUserComplete, useAuth, UserType } from "../context/authUserContext";
import { createUser } from "../helpers/user";
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
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null as string | null);

  const [loading, setLoading] = useState(false);

  const { signUp, logIn, user } = useAuth();

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      if (
        !email ||
        email === "" ||
        !password ||
        password === "" ||
        !passwordConfirm ||
        passwordConfirm === ""
      ) {
        setError("Bitte fülle alle Felder aus.");
        setLoading(false);
        return;
      }

      //Check if email really is an email
      if (!email.includes("@")) {
        setError("Bitte gib eine gültige E-Mail Adresse ein.");
        setLoading(false);
        return;
      }

      //Check if password is long enough
      if (password.length < 6) {
        setLoading(false);
        setError("Das Passwort muss mindestens 6 Zeichen lang sein.");
        return;
      }

      //Check if passwords match
      if (password !== passwordConfirm) {
        setLoading(false);
        setError("Die Passwörter stimmen nicht überein.");
        return;
      }

      let user: UserCredential = await signUp(email, password);
      await createUser({
        email,
        uid: user.user.uid,
      } as UserType);

      await logIn(email, password);
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
      if (redirect && redirect !== "/login" && redirect !== "") {
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
              <div className={styles.login_box_header}>Konto erstellen</div>
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
              <Spacer type="vertical" size={24} />
              <BasicInputField
                isPassword={true}
                label="Passwort bestätigen"
                onChange={(s: string) => {
                  setPasswordConfirm(s);
                }}
              />
              <Spacer type="vertical" size={32} />
              {error && (
                <div className={styles.error}>
                  {error}
                  <Spacer type="vertical" size={32} />
                </div>
              )}
              <div className={styles.row}>
                <ActionButton
                  height={"50px"}
                  width={"100%"}
                  loading={loading}
                  onClick={onSubmit}
                  title="Einloggen"
                />
              </div>
              <div className={styles.signup_cta}>
                Du hast bereits ein Konto?{" "}
                <span
                  className={styles.signup_cta_link}
                  onClick={() => {
                    router.push(`/login?redirect=${redirect}`);
                  }}
                >
                  Jetzt einloggen
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
