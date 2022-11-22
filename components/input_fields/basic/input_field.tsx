import PropTypes from "prop-types";
import styles from "./input_field.module.css";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { generateUID, randstr, useOutsideAlerter } from "../../../helpers/util";

export { BasicInputField };

type BasicInputFieldArguments = {
  label?: string;
  hint?: string;
  help?: string;
  onChange: any;
  width?: number;
  readOnly?: boolean;
  isPassword?: boolean;
  clearable?: boolean;
  initialValue?: string;
  error?: string;
  icon?: JSX.Element;
  onFocus?: any;
  onUnfocus?: any;
  isDisabled?: boolean;
};

const BasicInputField = forwardRef((props: BasicInputFieldArguments, ref) => {
  let {
    label,
    hint,
    help,
    onChange,
    width,
    readOnly,
    isPassword,
    clearable,
    initialValue,
    error,
    icon,
    onFocus,
    onUnfocus,
    isDisabled,
  } = props as BasicInputFieldArguments;

  const [focused, setFocus] = useState(false);
  const [input, setInput] = useState(initialValue ?? "");
  const [showPassword, toggleShowPassword] = useState(false);

  useImperativeHandle(ref, () => ({
    clear() {
      setInput("");
    },
    updateInput(s: string) {
      setInput(s);
    },
  }));

  useEffect(() => {
    //apply focus eventListener and change the state
    let el: any = document.getElementsByClassName(styles.input)[0];
    if (el) {
      el.addEventListener("focus", () => {
        if (!isDisabled) {
          setFocus(true);
          if (onFocus) onFocus();
        }
      });
      //listen for tab button pressed
      el.addEventListener("keydown", (e: any) => {
        if (e.key === "Tab") {
          setFocus(false);
          if (onUnfocus) onUnfocus();
        }
      });
    }

    return () => {
      if (el) {
        el.removeEventListener("focus", () => {
          setFocus(true);
        });
        el.removeEventListener("keydown", (e: any) => {
          if (e.key === "Tab") {
            setFocus(false);
          }
        });
      }
    };
  }, []);

  useEffect(() => {
    if (initialValue) setInput(initialValue);
  }, [initialValue]);

  function getType() {
    return !isPassword || showPassword ? "text" : "password";
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setFocus(false);
  });

  function getShowPasswordToggle() {
    if (isPassword && !showPassword) {
      return (
        <div
          onClick={() => {
            toggleShowPassword(!showPassword);
          }}
          className={styles.toggle_icon}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.12"
            height="14.397"
            viewBox="0 0 19.12 14.397"
          >
            <g
              id="Group_351"
              data-name="Group 351"
              transform="translate(0.9 0.9)"
            >
              <path
                id="Path_254"
                data-name="Path 254"
                d="M1.5,12.3S4.649,6,10.16,6s8.66,6.3,8.66,6.3-3.149,6.3-8.66,6.3S1.5,12.3,1.5,12.3Z"
                transform="translate(-1.5 -6)"
                fill="none"
                stroke="#8D8980"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
              <path
                id="Path_255"
                data-name="Path 255"
                d="M18.224,15.862A2.362,2.362,0,1,1,15.862,13.5,2.362,2.362,0,0,1,18.224,15.862Z"
                transform="translate(-7.202 -9.564)"
                fill="none"
                stroke="#8D8980"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </g>
          </svg>
        </div>
      );
    }

    if (isPassword && showPassword) {
      return (
        <div
          onClick={() => {
            toggleShowPassword(!showPassword);
          }}
          className={styles.toggle_icon}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.866"
            height="19.865"
            viewBox="0 0 19.866 19.865"
          >
            <g
              id="Group_350"
              data-name="Group 350"
              transform="translate(1.273 1.272)"
            >
              <path
                id="Path_256"
                data-name="Path 256"
                d="M14.837,16.975A7.928,7.928,0,0,1,10.16,18.6c-5.511,0-8.66-6.3-8.66-6.3A14.525,14.525,0,0,1,5.484,7.622M8.507,6.189A7.18,7.18,0,0,1,10.16,6c5.511,0,8.66,6.3,8.66,6.3a14.565,14.565,0,0,1-1.7,2.511m-5.291-.842a2.362,2.362,0,1,1-3.338-3.338"
                transform="translate(-1.5 -3.638)"
                fill="none"
                stroke="#8D8980"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
              <path
                id="Path_257"
                data-name="Path 257"
                d="M1.5,1.5,18.82,18.82"
                transform="translate(-1.5 -1.5)"
                fill="none"
                stroke="#8D8980"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </g>
          </svg>
        </div>
      );
    }

    return null;
  }

  function getClearButton() {
    if (focused && clearable && input && input !== "") {
      return (
        <div
          onClick={(e) => {
            e.preventDefault();
            setInput("");
            onChange(null);
            let el: any = document?.getElementsByClassName(styles.input)[0];
            el?.focus();
          }}
          className={styles.icon}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13.098"
            height="13.097"
            viewBox="0 0 13.098 13.097"
          >
            <path
              id="Path_6353"
              data-name="Path 6353"
              d="M4714.045-2055.655l-4.979-4.978-4.979,4.978a.921.921,0,0,1-1.3,0,.922.922,0,0,1,0-1.3l4.979-4.979-4.979-4.979a.92.92,0,0,1,0-1.3.92.92,0,0,1,1.3,0l4.979,4.978,4.979-4.978a.919.919,0,0,1,1.3,0,.919.919,0,0,1,0,1.3l-4.978,4.979,4.978,4.979a.922.922,0,0,1,0,1.3.919.919,0,0,1-.65.269A.914.914,0,0,1,4714.045-2055.655Z"
              transform="translate(-4702.518 2068.483)"
              fill="#8D8980"
            />
          </svg>
        </div>
      );
    }

    return null;
  }

  return (
    <div
      ref={wrapperRef}
      onClick={() => {
        if (!isDisabled) setFocus(true);
      }}
      className={
        styles.form_field +
        " " +
        (focused ? styles.focused : "") +
        " " +
        (icon ? styles.has_icon : "") +
        " " +
        (help ? styles.has_help : "") +
        " " +
        (isPassword ? styles.password : "") +
        " " +
        (isDisabled ? styles.disabled : "") +
        " " +
        (error ? styles.has_error : "")
      }
    >
      <style jsx>
        {`
          .${styles.form_field} {
            width: ${width ? width + "px" : "100%"};
          }
        `}
      </style>
      <input
        value={input}
        className={styles.input}
        placeholder={hint}
        readOnly={readOnly}
        disabled={isDisabled}
        type={getType()}
        onChange={(e) => {
          setInput(e.target.value);
          onChange(e.target.value);
        }}
      />

      {help && (
        <div className={styles.help_link}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13.378"
            height="13.377"
            viewBox="0 0 13.378 13.377"
          >
            <path
              id="Path_619"
              data-name="Path 619"
              d="M8721,863.689a6.689,6.689,0,1,1,6.688,6.689A6.7,6.7,0,0,1,8721,863.689Zm1.327,0a5.362,5.362,0,1,0,5.361-5.361A5.367,5.367,0,0,0,8722.328,863.689Zm4.7,2.41v-2.41a.664.664,0,1,1,1.327,0v2.41a.664.664,0,1,1-1.327,0Zm-.122-4.7a.764.764,0,1,1,.765.763A.764.764,0,0,1,8726.9,861.4Z"
              transform="translate(-8721.001 -857)"
              fill="#8d8980"
            />
          </svg>
          Mehr dazu
        </div>
      )}

      {help && (
        <div className={styles.help}>
          <div className={styles.help_header}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.378"
              height="13.377"
              viewBox="0 0 13.378 13.377"
            >
              <path
                id="Path_619"
                data-name="Path 619"
                d="M8721,863.689a6.689,6.689,0,1,1,6.688,6.689A6.7,6.7,0,0,1,8721,863.689Zm1.327,0a5.362,5.362,0,1,0,5.361-5.361A5.367,5.367,0,0,0,8722.328,863.689Zm4.7,2.41v-2.41a.664.664,0,1,1,1.327,0v2.41a.664.664,0,1,1-1.327,0Zm-.122-4.7a.764.764,0,1,1,.765.763A.764.764,0,0,1,8726.9,861.4Z"
                transform="translate(-8721.001 -857)"
                fill="#1D1A0E"
              />
            </svg>
            Mehr dazu
          </div>
          {help}
        </div>
      )}

      {getShowPasswordToggle()}

      {icon && <div className={styles.icon}>{icon}</div>}

      {getClearButton()}

      {label && label.length > 0 && (
        <label
          className={
            styles.label +
            " " +
            (focused || input.length > 0 ? styles.small_label : "")
          }
        >
          {label}
        </label>
      )}

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
});

BasicInputField.displayName = "BasicInputField";
