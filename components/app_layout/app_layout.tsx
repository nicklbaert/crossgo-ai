import { useState, useEffect, useRef } from "react";
import router, { useRouter } from "next/router";
import styles from "./app_layout.module.css";
import PropTypes from "prop-types";
import Head from "next/head";
import { NavBar } from "../navbar/navbar";

export { AppLayout };

AppLayout.propTypes = {
  content: PropTypes.node.isRequired,
  backTitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headingButton: PropTypes.any,
  onBack: PropTypes.func,
};

type AppLayoutArgs = {
  content: any;
  backTitle?: string;
  title?: string;
  subtitle?: string;
  headingButton?: any;
  onBack?: () => void;
};

function AppLayout({
  content,
  backTitle,
  title,
  subtitle,
  headingButton,
  onBack,
  ...props
}: AppLayoutArgs) {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("dashboard");

  useEffect(() => {
    //listen on browser back button cicked
    window.onpopstate = () => {
      console.log("router going back");
      //removeLast();
    };
  }, [router]);

  return (
    <div className={styles.all_wrap}>
      <NavBar app={true} />
      <div className={styles.content}>
        {backTitle && (
          <div onClick={onBack} className={styles.back}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.765"
              height="15.764"
              viewBox="0 0 15.765 15.764"
            >
              <path
                id="Path_27"
                data-name="Path 27"
                d="M-6430.472-479.383l-7.362-7.363a.5.5,0,0,1-.167-.372.5.5,0,0,1,.156-.362l7.374-7.374a.5.5,0,0,1,.708,0,.5.5,0,0,1,0,.708l-6.528,6.528h13.556a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-13.558l6.529,6.529a.5.5,0,0,1,0,.706.5.5,0,0,1-.354.147A.493.493,0,0,1-6430.472-479.383Z"
                transform="translate(6438.001 495)"
                fill="#21262c"
              />
            </svg>
            {backTitle}
          </div>
        )}

        <div className={styles.top_row}>
          <div className={"heading"}>{title}</div>
          {headingButton && (
            <div className={styles.heading_button}>{headingButton}</div>
          )}
        </div>
        <div className={styles.section_content}>{content}</div>
      </div>
    </div>
  );
}
