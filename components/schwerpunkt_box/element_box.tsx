import { useRef, useState } from "react";
import { useAuth } from "../../context/authUserContext";
import { colorOptions } from "../../helpers/api/content";
import {
  Detail,
  Makroschritt,
  Methode,
  Schwerpunkt,
  UserSchwerpunkt,
} from "../../helpers/types";
import { abbreviate, useOutsideAlerter } from "../../helpers/util";
import styles from "./element_box.module.css";

export { SchwerpunktBox };

function SchwerpunktBox({
  element,
  title,
  onColorUpdate,
  onDelete,
  onClick,
}: {
  element: UserSchwerpunkt;
  title: string;
  onColorUpdate: (c: string) => void;
  onDelete: () => void;
  onClick: () => void;
}) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  let optionsWrapperRef = useRef(null);
  let colorWrapperRef = useRef(null);

  useOutsideAlerter(optionsWrapperRef, () => {
    setShowMenu(false);
  });

  useOutsideAlerter(colorWrapperRef, () => {
    setShowColorMenu(false);
  });

  const [color, setColor] = useState(element.color);

  const [showMenu, setShowMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        <div className={styles.content_left}>
          {element.color && (
            <div
              onClick={() => {
                setShowColorMenu(!showColorMenu);
              }}
              className={styles.color_circle}
              style={{
                backgroundColor: color ?? "#806e6a",
              }}
            >
              <div
                ref={colorWrapperRef}
                className={
                  styles.menu +
                  " " +
                  styles.color_menu +
                  " " +
                  (showColorMenu ? styles.visible : "")
                }
              >
                {colorOptions.map((c, index) => {
                  return (
                    <div
                      onClick={() => {
                        setColor(c);
                        if (onColorUpdate) onColorUpdate(c);
                        setShowColorMenu(false);
                      }}
                      key={index}
                      style={{
                        backgroundColor: c,
                      }}
                      className={styles.color_option}
                    ></div>
                  );
                })}
              </div>
            </div>
          )}
          <div className={styles.name}>
            {abbreviate(element.data!.name, 60)}
          </div>
        </div>
        <div className={styles.content_right}>
          <div
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className={styles.icon}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5.119"
              height="21.02"
              viewBox="0 0 5.119 21.02"
            >
              <path
                id="Path_44"
                data-name="Path 44"
                d="M-3456,1827.393a2.6,2.6,0,0,1,2.56-2.626,2.6,2.6,0,0,1,2.56,2.626,2.6,2.6,0,0,1-2.56,2.626A2.6,2.6,0,0,1-3456,1827.393Zm0-7.884a2.6,2.6,0,0,1,2.56-2.626,2.6,2.6,0,0,1,2.56,2.626,2.6,2.6,0,0,1-2.56,2.626A2.6,2.6,0,0,1-3456,1819.509Zm0-7.883a2.6,2.6,0,0,1,2.56-2.626,2.6,2.6,0,0,1,2.56,2.626,2.6,2.6,0,0,1-2.56,2.626A2.6,2.6,0,0,1-3456,1811.626Z"
                transform="translate(3456 -1809)"
                fill="#806e6a"
              />
            </svg>
          </div>
          <div
            ref={optionsWrapperRef}
            className={styles.menu + " " + (showMenu ? styles.visible : "")}
          >
            <div
              onClick={() => {
                setShowMenu(false);
                onDelete();
              }}
              className={styles.menu_item + " " + styles.delete}
            >
              <div className={styles.menu_item_icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="129.06"
                  height="148.107"
                  viewBox="0 0 129.06 148.107"
                >
                  <path
                    id="Path_45"
                    data-name="Path 45"
                    d="M31.711,148.107a19.714,19.714,0,0,1-19.692-19.692V36.521H6.564a6.564,6.564,0,0,1,0-13.128H32.486a26.045,26.045,0,0,1-.283-3.947A19.445,19.445,0,0,1,51.648,0H77.411A19.468,19.468,0,0,1,96.856,19.445a26.043,26.043,0,0,1-.283,3.947H122.5a6.564,6.564,0,1,1,0,13.128h-5.455v91.894a19.714,19.714,0,0,1-19.692,19.692Zm-6.565-19.692a6.572,6.572,0,0,0,6.565,6.565H97.349a6.572,6.572,0,0,0,6.565-6.565V36.521H25.146ZM84.011,23.393a26.044,26.044,0,0,1-.283-3.947,6.325,6.325,0,0,0-6.317-6.318H51.648a6.318,6.318,0,0,0-6.318,6.318,26.045,26.045,0,0,1-.283,3.947ZM71.738,99.174V60.53a6.564,6.564,0,0,1,13.128,0V99.174a6.564,6.564,0,0,1-13.128,0Zm-25.762,0V60.53a6.564,6.564,0,1,1,13.127,0V99.174a6.564,6.564,0,0,1-13.127,0Z"
                    fill="#341b15"
                  />
                </svg>
              </div>
              Löschen
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
