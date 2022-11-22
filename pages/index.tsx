import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import { AppLayout } from "../components/app_layout/app_layout";
import { ActionButton, buttonStyle } from "../components/buttons/ActionButton";
import { BasicInputField } from "../components/input_fields/basic/input_field";
import { Layout } from "../components/layout/layout";
import ProtectedRoute from "../components/ProtectedRoute";
import { Spacer } from "../components/spacer/Spacers";
import { useAuth } from "../context/authUserContext";
import { fetchJSON } from "../lib/apiHelper";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [showButtonOptions, setShowButtonOptions] = useState(false);
  let router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user.uid) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <Layout
      content={
        <div className={styles.wrapper + " page"}>
          <div className={styles.content}>
            <div className={styles.bg}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/pyro-development.appspot.com/o/bg_element.png?alt=media&token=bc474d4e-a12f-4020-ab36-9059cc7fe1a8"
                alt="bg"
              />
            </div>
            <h1>Sag Hallo zu Alani.</h1>
            <h2>Irgendeine Tagline zu Alani</h2>
            <div className={styles.buttons}>
              <ActionButton
                height={"50px"}
                onClick={() => {
                  router.push("/dashboard");
                }}
                title="Kostenlos starten"
              />
              <Spacer type="horizontal" size={16} />
              <ActionButton
                height={"50px"}
                style={buttonStyle.secondary}
                onClick={() => {
                  router.push("/dashboard");
                }}
                title="Mehr erfahren"
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Home;
