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
import { isUserComplete, useAuth, UserType } from "../context/authUserContext";
import { createUser } from "../helpers/api_wrapper";
import styles from "../styles/Login.module.css";

const LoginPage: NextPage = () => {
  let router = useRouter();

  let redirect = router.query.redirect as string;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, logIn, user } = useAuth();

  const onSubmit = async () => {
    try {
      let user: UserCredential = await signUp(email, password);
      await createUser({
        email,
        uid: user.user.uid,
      } as UserType);

      await logIn(email, password);
    } catch (error: any) {
      console.log(error.message);
    }
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
                  setPassword(s);
                }}
              />
              <Spacer type="vertical" size={32} />
              <div className={styles.row}>
                <ActionButton
                  height={"50px"}
                  width={"100%"}
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
