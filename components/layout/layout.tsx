import { useState, useEffect, useRef } from "react";
import router, { useRouter } from "next/router";
import styles from "./layout.module.css";
import PropTypes from "prop-types";
import Head from "next/head";

export { Layout };

Layout.propTypes = {
  content: PropTypes.node.isRequired,
  currentPageName: PropTypes.string,
};

type LayoutArgs = {
  content: any;
  currentPageName?: string | null;
};

function Layout({ content, currentPageName, ...props }: LayoutArgs) {
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
      <div className={styles.page_wide}>
        <div id="content">{content}</div>
      </div>
    </div>
  );
}
