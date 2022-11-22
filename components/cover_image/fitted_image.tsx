import PropTypes from "prop-types";
import styles from "./fitted_image.module.css";
import Image from "next/image";

export { FittedImage };

FittedImage.propTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.number,
  heightMobile: PropTypes.string,
  bottomNoBorderRadius: PropTypes.bool,
};

FittedImage.defaultProps = {
  src: undefined,
  width: "100%",
  height: "250px",
  borderRadius: 14,
  heightMobile: "330px",
  bottomNoBorderRadius: false,
  rightNoBorderRadius: false,
};

type FittedImageArguments = {
  src: string | undefined;
  width: string;
  height: string;
  borderRadius: 8 | 10 | 14 | 16 | 24 | 32 | 48 | 64 | 128 | 1000;
  heightMobile: string;
  bottomNoBorderRadius: boolean;
  rightNoBorderRadius: boolean;
};

function FittedImage({
  src,
  width,
  height,
  borderRadius,
  heightMobile,
  bottomNoBorderRadius,
  rightNoBorderRadius,
  ...props
}: FittedImageArguments) {
  let url =
    src ??
    "https://firebasestorage.googleapis.com/v0/b/radar-ce6a0.appspot.com/o/config%2Fno_image.png?alt=media&token=0bd91c36-c477-4d67-a2e5-9b737e7e67e4";

  if (url == "")
    url =
      "https://firebasestorage.googleapis.com/v0/b/radar-ce6a0.appspot.com/o/config%2Fno_image.png?alt=media&token=0bd91c36-c477-4d67-a2e5-9b737e7e67e4";

  function getBorderRadiusClass(radius: number) {
    switch (radius) {
      case 8:
        return styles.border_radius_8;
      case 10:
        return styles.border_radius_10;
      case 14:
        return styles.border_radius_14;
      case 16:
        return styles.border_radius_16;
      case 24:
        return styles.border_radius_24;
      case 32:
        return styles.border_radius_32;
      case 48:
        return styles.border_radius_48;
      case 64:
        return styles.border_radius_64;
      case 128:
        return styles.border_radius_128;
      case 1000:
        return styles.border_radius_1000;

      default:
        return styles.border_radius_14;
    }
  }

  return (
    <div
      className={
        "image_container " +
        styles.image_container +
        " " +
        getBorderRadiusClass(borderRadius) +
        " " +
        (bottomNoBorderRadius ? styles.bottom_no_border_radius : "") +
        " " +
        (rightNoBorderRadius ? styles.right_no_border_radius : "")
      }
    >
      <style jsx>{`
        .image_container {
          height: ${height};
          width: ${width};
          z-index: 0;
          position: relative;
          background-color: #f0efef;
          transition: 0.2s ease-in;
        }

        @media screen and (max-width: 610px) {
          .image_container {
            height: ${heightMobile};
          }
        }
      `}</style>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image
          className={
            styles.img +
            " " +
            getBorderRadiusClass(borderRadius) +
            " " +
            (bottomNoBorderRadius ? styles.bottom_no_border_radius : "") +
            " " +
            (rightNoBorderRadius ? styles.right_no_border_radius : "")
          }
          alt="Cover Image"
          src={url}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </div>
  );
}
