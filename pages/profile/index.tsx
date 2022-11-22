import { UserCredential } from "firebase/auth";
import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ActionButton } from "../../components/buttons/ActionButton";
import { BasicInputField } from "../../components/input_fields/basic/input_field";
import { Layout } from "../../components/layout/layout";
import { Spacer } from "../../components/spacer/Spacers";
import { useAuth } from "../../context/authUserContext";
import styles from "../../styles/profile/index.module.css";

const ProfilePage: NextPage = () => {
  let router = useRouter();

  let redirect = router.query.redirect as string;

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
          <div className={styles.content}></div>
        </div>
      }
    />
  );
};

export default ProfilePage;
