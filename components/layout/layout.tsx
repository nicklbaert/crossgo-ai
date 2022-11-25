import { useState, useEffect, useRef } from "react";
import router, { useRouter } from "next/router";
import styles from "./layout.module.css";
import PropTypes from "prop-types";
import Head from "next/head";
import { NavBar } from "../navbar/navbar";

export { Layout };

Layout.propTypes = {
  content: PropTypes.node.isRequired,
  currentPageName: PropTypes.string,
  makeSwitch: PropTypes.func,
  social: PropTypes.bool,
};

type LayoutArgs = {
  content: any;
  currentPageName?: string | null;
  makeSwitch?: () => void;
  social?: boolean;
};

function Layout({
  content,
  currentPageName,
  makeSwitch,
  social,
  ...props
}: LayoutArgs) {
  const router = useRouter();

  useEffect(() => {
    //listen on browser back button cicked
    window.onpopstate = () => {
      console.log("router going back");
      //removeLast();
    };
  }, [router]);

  return (
    <div className={styles.all_wrap}>
      <NavBar makeSwitch={makeSwitch} social={social} />
      <div className={styles.page_wide}>
        <div id="content">{content}</div>
      </div>
    </div>
  );
}
