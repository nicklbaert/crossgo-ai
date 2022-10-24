import { useRouter } from "next/router";
import { text } from "node:stream/consumers";
import PropTypes from "prop-types";
import { Spinner } from "./spinner/Spinner";
import styles from "./ActionButtons.module.css";

export { ActionButton };

export const buttonStyle = {
  primary: "primary",
  secondary: "secondary",
  white: "white",
};

ActionButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  link: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  isDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.string,
  fontSize: PropTypes.number,
};

ActionButton.defaultProps = {
  title: "Click me",
  onClick: null,
  link: null,
  width: null,
  height: null,
  isDisabled: false,
  loading: false,
  style: buttonStyle.primary,
  fontSize: 16,
};

type ActionButtonArguments = {
  title: string;
  onClick?: any;
  link?: string | null;
  width?: string | null;
  height?: string | null;
  isDisabled?: boolean | null;
  loading?: boolean;
  style: string; //buttonType
  fontSize?: number;
};

function ActionButton({
  title,
  onClick,
  link,
  width,
  height,
  isDisabled,
  loading,
  style,
  fontSize,
  ...props
}: ActionButtonArguments) {
  function getClassNameExtensionForType() {
    return styles[style];
  }

  let className =
    styles.button +
    " " +
    (isDisabled ? styles.disabled : "") +
    " " +
    getClassNameExtensionForType();

  let w = width !== null ? width : "100%";
  let h = height !== null ? height : "55px";
  let f = fontSize !== null ? fontSize + "px" : "16px";

  let spinner;

  if (style === buttonStyle.primary) {
    spinner = <Spinner color={"#ffffff"} />;
  } else if (style === buttonStyle.secondary) {
    spinner = <Spinner />;
  }

  if (link) {
    return (
      <a href={link} className={className}>
        <style jsx>{`
          .${styles.button} {
            width: ${w};
            height: ${h};
            font-size: ${f}px;
          }
        `}</style>
        {loading && spinner}
        {!loading && title}
      </a>
    );
  } else {
    return (
      <button onClick={(e) => onClick(e)} className={className}>
        <style jsx>{`
          .${styles.button} {
            width: ${w};
            height: ${h};
            font-size: ${f};
          }
        `}</style>
        {loading && spinner}
        {!loading && title}
      </button>
    );
  }
}
