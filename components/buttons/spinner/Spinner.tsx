import styles from "./Spinner.module.css";
import PropTypes from "prop-types";

export { Spinner };

Spinner.propTypes = {
  color: PropTypes.string,
};

Spinner.defaultProps = {
  color: "#1D1A0E",
};

type SpinnerArguments = {
  color: string;
};

function Spinner({ color, ...props }: SpinnerArguments) {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner_div}></div>
      <div className={styles.spinner_div}></div>
      <div className={styles.spinner_div}></div>
      <div className={styles.spinner_div}></div>
      <style jsx>{`
        .${styles.spinner_div} {
          border-color: ${color} transparent transparent transparent;
        }
      `}</style>
    </div>
  );
}
