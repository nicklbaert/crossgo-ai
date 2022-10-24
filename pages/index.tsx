import type { NextPage } from "next";
import { useState } from "react";
import { AppLayout } from "../components/app_layout/app_layout";
import { ActionButton } from "../components/buttons/ActionButton";
import { Layout } from "../components/layout/layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [showButtonOptions, setShowButtonOptions] = useState(false);

  return <div className={styles.wrapper}>Login</div>;
};

export default Home;
