import styles from "./TextComponents.module.css";
import PropTypes from "prop-types";

export { HugeHeading, BigHeading, Paragraph, Subheading };

HugeHeading.propTypes = {};

HugeHeading.defaultProps = {
  text: "A huge heading",
};

type TextArguments = {
  text: string | string[];
};

function HugeHeading({ text, ...props }: TextArguments) {
  if (typeof text === "string") {
    return <h1 className={styles.huge_heading}>{text}</h1>;
  } else {
    return (
      <div>
        {text.map((t) => (
          <h1 key={t} className={styles.huge_heading}>
            {t}
          </h1>
        ))}
      </div>
    );
  }
}

BigHeading.propTypes = {
  text: PropTypes.any,
  fontSize: PropTypes.number,
  color: PropTypes.string,
};

BigHeading.defaultProps = {
  text: "A big heading",
  fontSize: 48,
  color: '#1D1A0E'
};

type BigHeadingArgs = {
  fontSize: number;
  text: string | string[];
  color: string | null;
};

function BigHeading({ text, fontSize, color, ...props }: BigHeadingArgs) {
  if (typeof text === "string") {
    return (
      <h1 className={styles.big_heading + ' selectable'}>
        {text}{" "}
        <style jsx>{`
          .${styles.big_heading} {
            font-size: ${fontSize + "px"};
            color: ${color ? color : '#1D1A0E'};
            line-height: ${fontSize + 12 + "px"};
            letter-spacing: -${fontSize/50 + "px"};
          }

          @media screen and (max-width: 768px) {
            .${styles.big_heading} {
              font-size: ${Math.max(fontSize * 0.7, 24) + "px"};
              line-height: ${fontSize + "px"};
            }
          }
        `}</style>
      </h1>
    );
  } else {
    return (
      <div>
        {text.map((t) => (
          <h1 key={t} className={styles.big_heading}>
            {t}
          </h1>
        ))}
        <style jsx>{`
          .${styles.big_heading} {
            font-size: ${fontSize + "px"};
            line-height: ${fontSize + 12 + "px"};
          }
        `}</style>
      </div>
    );
  }
}

Subheading.propTypes = {
  text: PropTypes.any,
  fontSize: PropTypes.number,
  color: PropTypes.string,
};

Subheading.defaultProps = {
  text: "A sub heading",
  fontSize: 48,
  color: '#1D1A0E'
};

type SubheadingArgs = {
  fontSize: number;
  text: string | string[];
  color: string | null;
};

function Subheading({ text, fontSize, color, ...props }: BigHeadingArgs) {
  if (typeof text === "string") {
    return (
      <h2 className={styles.sub_heading + ' selectable'}>
        {text}{" "}
        <style jsx>{`
          .${styles.sub_heading} {
            font-size: ${fontSize + "px"};
            color: ${color ? color : '#1D1A0E'};
            line-height: ${fontSize + 12 + "px"};
          }
        `}</style>
      </h2>
    );
  } else {
    return (
      <div>
        {text.map((t) => (
          <h2 key={t} className={styles.sub_heading}>
            {t}
          </h2>
        ))}
        <style jsx>{`
          .${styles.sub_heading} {
            font-size: ${fontSize + "px"};
            line-height: ${fontSize + 12 + "px"};
          }
        `}</style>
      </div>
    );
  }
}

PageHeading.propTypes = {
  text: PropTypes.any,
  fontSize: PropTypes.number,
};

PageHeading.defaultProps = {
  text: "A page heading",
  fontSize: 32,
};

type PageHeadingArgs = {
  fontSize: number;
  text: string | string[];
};

function PageHeading({ text, fontSize, ...props }: PageHeadingArgs) {
  if (typeof text === "string") {
    return (
      <h1 className={styles.big_heading}>
        {text}{" "}
        <style jsx>{`
          .${styles.big_heading} {
            font-size: ${fontSize + "px"};
            line-height: ${fontSize + 12 + "px"};
          }
        `}</style>
      </h1>
    );
  } else {
    return (
      <div>
        {text.map((t) => (
          <h1 key={t} className={styles.big_heading}>
            {t}
          </h1>
        ))}
        <style jsx>{`
          .${styles.big_heading} {
            font-size: ${fontSize + "px"};
            line-height: ${fontSize + 12 + "px"};
          }
        `}</style>
      </div>
    );
  }
}

Paragraph.propTypes = {
  text: PropTypes.any,
  fontSize: PropTypes.number,
};

Paragraph.defaultProps = {
  text: "A big heading",
  fontSize: 18,
};

type ParagraphArgs = {
  fontSize: number;
  text: string | string[];
};

function Paragraph({ text, fontSize, ...props }: ParagraphArgs) {
  if (typeof text === "string") {
    return (
      <p className={styles.paragraph} >
        {text}
        <style jsx>{`
          .${styles.paragraph} {
            font-size: ${fontSize + "px"};
            line-height: ${fontSize + 12 + "px"};
          }
        `}</style>
      </p>
    );
  } else {
    return (
      <div>
        {text.map((t) => (
          <p key={t} className={styles.paragraph}>
            {t}
          </p>
        ))}
        <style jsx>{`
          .${styles.paragraph} {
            font-size: ${fontSize + "px"};
            line-height: ${fontSize + 12 + "px"};
          }
        `}</style>
      </div>
    );
  }
}
