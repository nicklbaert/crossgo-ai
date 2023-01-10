import { useState, useEffect, useRef } from "react";

import { NavLink } from "./NavLink";
import PropTypes from "prop-types";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import { ActionButton, buttonStyle } from "../buttons/ActionButton";
import { useAuth } from "../../context/authUserContext";
import { FittedImage } from "../cover_image/fitted_image";
import { Spacer } from "../spacer/Spacers";

export { NavBar };

function NavBar({
  isSticky,
  app,
  makeSwitch,
  social,
  ...props
}: {
  isSticky?: boolean;
  app?: boolean;
  makeSwitch?: () => void;
  social?: boolean;
}) {
  const router = useRouter();

  const { user, logOut } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let overallWrapper = document.getElementById("overall_wrapper");
    if (!overallWrapper) return;

    if (menuOpen) {
      overallWrapper.classList.add("overall_wrapper_prevent_scroll");
    } else {
      overallWrapper.classList.remove("overall_wrapper_prevent_scroll");
    }
  }, [menuOpen]);

  return (
    <div
      className={
        styles.nav_wrapper +
        " " +
        (isSticky || menuOpen ? styles.nav_wrapper_sticky : "") +
        " " +
        (app ? styles.nav_wrapper_app : "")
      }
      id="navbar"
    >
      <div className={styles.nav}>
        <div className={styles.logo}>
          <div onClick={() => setMenuOpen(false)}>
            <NavLink
              href="/"
              pushHistory={false}
              exact
              className={styles.nav_linko + " " + styles.logo}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="151.056"
                height="34.331"
                viewBox="0 0 151.056 34.331"
              >
                <path
                  id="Path_29"
                  data-name="Path 29"
                  d="M-295.678-460.669a.246.246,0,0,1-.247-.248V-462.8a.246.246,0,0,1,.247-.247h1.23a8.966,8.966,0,0,0,9-8.807v-4.715a11.762,11.762,0,0,1-9.029,4.468,11.484,11.484,0,0,1-11.5-11.447A11.487,11.487,0,0,1-294.476-495a11.523,11.523,0,0,1,11.541,11.488v11.675a11.379,11.379,0,0,1-11.512,11.168Zm-7.816-22.883a9.078,9.078,0,0,0,9.017,9.114,9.071,9.071,0,0,0,9.017-9.114,9.079,9.079,0,0,0-9.017-9.119A9.079,9.079,0,0,0-303.493-483.552Zm23.557,0A11.487,11.487,0,0,1-268.44-495a11.484,11.484,0,0,1,11.5,11.448,11.487,11.487,0,0,1-11.5,11.447A11.484,11.484,0,0,1-279.937-483.552Zm2.48,0a9.078,9.078,0,0,0,9.017,9.114,9.076,9.076,0,0,0,9.017-9.114,9.079,9.079,0,0,0-9.017-9.119A9.079,9.079,0,0,0-277.457-483.552Zm-93.9,0A11.487,11.487,0,0,1-359.863-495a11.484,11.484,0,0,1,11.5,11.448,11.486,11.486,0,0,1-11.5,11.447A11.484,11.484,0,0,1-371.36-483.552Zm2.479,0a9.078,9.078,0,0,0,9.017,9.114,9.075,9.075,0,0,0,9.016-9.114,9.079,9.079,0,0,0-9.016-9.119A9.079,9.079,0,0,0-368.88-483.552Zm-39.119,0A11.484,11.484,0,0,1-396.5-495a11.415,11.415,0,0,1,7.041,2.407.247.247,0,0,1,.094.17.261.261,0,0,1-.06.187l-1.258,1.44a.247.247,0,0,1-.341.032,8.82,8.82,0,0,0-5.475-1.907,9.079,9.079,0,0,0-9.016,9.119,9.078,9.078,0,0,0,9.016,9.114,8.992,8.992,0,0,0,6.615-2.963.247.247,0,0,1,.345-.02l1.465,1.262a.26.26,0,0,1,.085.175.253.253,0,0,1-.065.183,11.545,11.545,0,0,1-8.446,3.7A11.483,11.483,0,0,1-408-483.552Zm23.321,10.591a.246.246,0,0,1-.247-.247v-9.7A11.51,11.51,0,0,1-373.556-494.4h1.481a.249.249,0,0,1,.247.247v1.884a.246.246,0,0,1-.247.247h-1.355a9.076,9.076,0,0,0-9.017,9.114v9.7a.246.246,0,0,1-.247.247Zm59.662-.012a.246.246,0,0,1-.247-.248v-1.886a.245.245,0,0,1,.247-.247h10.356a3.835,3.835,0,0,0,3.887-3.673,3.766,3.766,0,0,0-3.887-3.623h-5.288c-3.514,0-6.371-2.589-6.371-5.775a6.117,6.117,0,0,1,6.327-5.823h7.812a.246.246,0,0,1,.247.247v1.887a.246.246,0,0,1-.247.247h-7.771a3.735,3.735,0,0,0-3.888,3.441,3.648,3.648,0,0,0,3.807,3.38h5.458a6.088,6.088,0,0,1,6.286,6.018,6.227,6.227,0,0,1-6.371,6.055Zm-19.495,0a.246.246,0,0,1-.247-.248v-1.886a.246.246,0,0,1,.247-.247h10.356a3.835,3.835,0,0,0,3.887-3.673,3.766,3.766,0,0,0-3.887-3.623h-5.288c-3.514,0-6.371-2.589-6.371-5.775a6.116,6.116,0,0,1,6.326-5.823h7.812a.246.246,0,0,1,.247.247v1.887a.246.246,0,0,1-.247.247h-7.767a3.734,3.734,0,0,0-3.888,3.441,3.648,3.648,0,0,0,3.806,3.38h5.458a6.081,6.081,0,0,1,6.282,6.018,6.227,6.227,0,0,1-6.371,6.055Z"
                  transform="translate(408 495)"
                  fill="#21262c"
                />
              </svg>
              {social && <span>Social</span>}
            </NavLink>
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.links_left}>
            <div className={styles.link} onClick={() => setMenuOpen(false)}>
              <NavLink
                pushHistory={false}
                href="/about/news"
                exact
                className={styles.nav_link}
              >
                Über Alani
              </NavLink>
            </div>
            <div className={styles.link} onClick={() => setMenuOpen(false)}>
              <NavLink
                pushHistory={false}
                href="/about/boosts"
                exact
                className={styles.nav_link}
              >
                Tools
              </NavLink>
            </div>
          </div>
          <div className={styles.links_right}>
            {/* {!social && (
              <ActionButton
                title="Zu Social wechseln"
                onClick={() => {
                  if (makeSwitch) makeSwitch();
                }}
                style={buttonStyle.tertiary}
              />
            )}
            {social && (
              <ActionButton
                title="Zum Tool wechseln"
                onClick={() => {
                  if (makeSwitch) makeSwitch();
                }}
                style={buttonStyle.tertiary}
              />
            )} */}
            <Spacer type="horizontal" size={16} />
            {!user?.uid && (
              <ActionButton
                onClick={() => {
                  router.push("/login");
                }}
                title="Anmelden"
              />
            )}
            {user?.uid && (
              <div className={styles.logged_in_row}>
                <div
                  onClick={() => {
                    router.push("/profile/settings");
                  }}
                  className={styles.user}
                >
                  {!user.avatar && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31.5"
                      height="36"
                      viewBox="0 0 31.5 36"
                    >
                      <path
                        id="Icon_awesome-user"
                        data-name="Icon awesome-user"
                        d="M15.75,18a9,9,0,1,0-9-9A9,9,0,0,0,15.75,18Zm6.3,2.25H20.876a12.24,12.24,0,0,1-10.252,0H9.45A9.452,9.452,0,0,0,0,29.7v2.925A3.376,3.376,0,0,0,3.375,36h24.75A3.376,3.376,0,0,0,31.5,32.625V29.7A9.452,9.452,0,0,0,22.05,20.25Z"
                        fill="#c4bcb1"
                      />
                    </svg>
                  )}
                  {user.avatar && (
                    <FittedImage
                      src={user.avatar}
                      height={"40px"}
                      width={"40px"}
                      borderRadius={64}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.mobile_header}>
          <div
            className={
              styles.menu_icon + " " + (menuOpen ? styles.menu_icon_open : "")
            }
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <div className={`${styles.menu_icon_bar}`}></div>
          </div>
          <div
            className={styles.menu + " " + (menuOpen ? styles.menu_open : "")}
          >
            <NavLink
              pushHistory={false}
              href="/about/news"
              exact
              className={styles.menu_link}
            >
              News
            </NavLink>
            <NavLink
              pushHistory={false}
              href="/about/boosts"
              exact
              className={styles.menu_link}
            >
              Boosts
            </NavLink>
            <NavLink
              pushHistory={false}
              href="/about/story"
              exact
              className={styles.menu_link}
            >
              Our story
            </NavLink>
            <NavLink
              pushHistory={false}
              href="/help/faq"
              exact
              className={styles.menu_link}
            >
              FAQ
            </NavLink>

            <div className={styles.bottom_links}>
              <ActionButton
                width={"100%"}
                onClick={() => {
                  //onSignupClicked();
                }}
                title="Registrieren"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.border}></div>
    </div>
  );
}
