import PropTypes from "prop-types";
import styles from "./number_input_field.module.css";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  generateUID,
  randstr,
  tryParseInt,
  useOutsideAlerter,
} from "../../../helpers/util";

export { NumberInputField };

type NumberInputFieldArguments = {
  label?: string;
  hint?: string;
  help?: string;
  onChange: any;
  width?: number;
  clearable?: boolean;
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  maxError?: string;
  minError?: string;
  error?: string;
  unit?: string;
  icon?: JSX.Element;
};

const NumberInputField = forwardRef((props: NumberInputFieldArguments, ref) => {
  let {
    label,
    hint,
    help,
    onChange,
    width,
    clearable,
    initialValue,
    min,
    max,
    step,
    maxError,
    minError,
    error,
    unit,
    icon,
  } = props as NumberInputFieldArguments;

  const [focused, setFocus] = useState(false);
  const [displayError, setError] = useState(error as string | null);

  const [input, setInput] = useState(initialValue as number | undefined);

  useImperativeHandle(ref, () => ({
    clear() {
      setInput(undefined);
    },
  }));

  const [timer, setTimer] = useState(null as any);

  const inputChanged = (e:any) => {
    let val = e.target.value;

    if (val.trim() === "") {
      setInput(undefined);
    }

    let i = tryParseInt(val);
    if (i !== null) {
      setInput(i!);
    } else {
      setInput(undefined);
    }

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      if (i && i > (max ?? 10000000000)) {
        setError(maxError ?? null);
        onChange(null);
        return;
      } else if (i && i < (min ?? 0)) {
        setError(minError ?? null);
        onChange(null);
        return;
      } else {
        setError(null);
      }
      onChange(i);
    }, 500);

    setTimer(newTimer);
  };

  useEffect(() => {
    var input = document.getElementsByClassName(styles.input)[0];

    console.log("FPUND ELEMENT: ", input);

    if (input) {
      input.addEventListener("keydown", function (e: any) {
        if (e.key === "Tab") {
          setFocus(false);
        }
      });

      input.addEventListener("focus", () => {
        setFocus(true);
      });
    }

    return () => {
      if (input) {
        input.removeEventListener("keydown", function (e: any) {
          if (e.key === "Tab") {
            setFocus(false);
          }
        });
        input.removeEventListener("focus", () => {
          setFocus(true);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (initialValue) setInput(initialValue);
  }, [initialValue]);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setFocus(false);
  });

  return (
    <div
      ref={wrapperRef}
      onClick={() => {
        setFocus(true);
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
        ((unit && focused) || (unit && input) ? styles.has_unit : "")
      }
    >
      <style jsx>
        {`
          .${styles.form_field} {
            width: ${width ? width + "px" : "100%"};
          }
          .${styles.has_unit} input {
            box-sizing: border-box;
            padding-left: ${unit ? 10 * unit!.length + 26 : 0}px;
          }
        `}
      </style>
      <input
        value={input !== undefined && input !== 0 ? input.toString() : ""}
        className={styles.input}
        placeholder={hint}
        type={"number"}
        onChange={inputChanged}
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

      {icon && <div className={styles.icon}>{icon}</div>}

      {unit !== undefined &&
        (focused || (input !== undefined && input !== 0)) && (
          <div className={styles.unit}>{unit}</div>
        )}

      {getClearButton()}

      {label && label.length > 0 && (
        <label
          className={
            styles.label +
            " " +
            (focused || (input !== undefined && input !== 0)
              ? styles.small_label
              : "")
          }
        >
          {label}
        </label>
      )}
    </div>
  );

  function getClearButton() {
    if (focused && clearable && input && input !== 0) {
      return (
        <div
          onClick={(e) => {
            e.preventDefault();
            setInput(undefined);
            onChange(null);
            let el: any = document.getElementsByClassName(styles.input)[0];
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
});

NumberInputField.displayName = "NumberInputField";