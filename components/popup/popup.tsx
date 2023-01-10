import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { CSSProperties, useEffect, useRef, useState } from "react";

import styles from "./popup.module.css";
import getConfig from "next/config";
import { useOutsideAlerter } from "../../helpers/util";
import { ActionButton } from "../buttons/ActionButton";

export { Popup };

type PopupArguments = {
  title: string;
  subtitle: string;

  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

function Popup({
  isOpen,
  content,
  onClose,
  id,
  title,
  subtitle,
  ...props
}: PopupArguments) {
  const states = {
    open: "open",
    closed: "closed",
    pending: "pending",
  };

  const [state, setState] = useState(states.closed);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    onClose();
  });

  useEffect(() => {
    console.log("OKOK: isOpen: ", isOpen);
    if (isOpen) {
      setState(states.pending);
    } else {
      setState(states.closed);
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("OKOK: state: ", state);
    if (state === states.pending) {
      setTimeout(() => {
        setState(states.open);
      }, 100);
    }
  }, [state]);

  function getWrapperStyle(): string {
    if (state == states.open)
      return (
        styles.popup_wrapper +
        " " +
        styles.popup_wrapper_pending +
        " " +
        styles.popup_wrapper_open
      );
    else if (state == states.pending)
      return styles.popup_wrapper + " " + styles.popup_wrapper_pending;
    else return styles.popup_wrapper;
  }

  function getOverlayStyle(): string {
    if (state == states.open || state == states.pending)
      return styles.overlay + " " + styles.overlay_open;
    else return styles.overlay;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={getOverlayStyle()}></div>
      <div className={getWrapperStyle()}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          ref={wrapperRef}
          className={styles.popup}
        >
          <div className={styles.popup_header}>
            <div className={styles.popup_title}>{title}</div>
            <div className={styles.popup_subtitle}>{subtitle}</div>
          </div>
          <div className={styles.content}>{content}</div>
          
        </div>
      </div>
    </div>
  );
}
