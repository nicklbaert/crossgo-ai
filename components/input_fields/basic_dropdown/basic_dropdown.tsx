import styles from "./basic_dropdown.module.css";
import PropTypes from "prop-types";
import { FixedSizeList as List } from "react-window";
import { useEffect, useRef, useState } from "react";
import { randstr, useOutsideAlerter } from "../../../helpers/util";
import { BasicInputField } from "../basic/input_field";

export { BasicDropdown };

BasicDropdown.propTypes = {
  label: PropTypes.string,
  help: PropTypes.string,
  hint: PropTypes.string,
  onChooseValue: PropTypes.func,
  width: PropTypes.number,
  initialResult: PropTypes.any,
  showIconInResult: PropTypes.bool,
  results: PropTypes.array,
  isDisabled: PropTypes.bool,
};

BasicDropdown.defaultProps = {
  label: undefined,
  hint: undefined,
  width: undefined,
  help: undefined,
  onChooseValue: (r: Result<any>) => {},
  initialResult: undefined,
  icon: undefined,
  showIconInResult: false,
  results: [],
  isDisabled: false,
};

type BasicDropdownArguments<T> = {
  label?: string;
  hint?: string;
  help?: string;
  onChooseValue: any;
  width?: number;
  initialResult?: Result<T>;
  icon?: JSX.Element;
  showIconInResult?: boolean;
  results: Result<T>[];
  isDisabled: boolean;
};

export type Result<T> = {
  title: string;
  subtitle?: string;
  iconImageUrl: string;
  value: T;
  emptyResultsText: string;
};

function BasicDropdown<ResultType>({
  label,
  hint,
  width,
  help,
  results,
  onChooseValue,
  initialResult,
  showIconInResult,
  isDisabled,
  ...props
}: BasicDropdownArguments<ResultType>) {
  const [error, setError] = useState(null as string | null);

  const [isSelected, setIsSelected] = useState(false);

  const [selectedResult, _setSelectedResult] = useState(
    initialResult ? initialResult : null
  );

  const selectedResultRef = useRef(selectedResult);
  const setSelectedResult = (data:Result<ResultType>) => {
    selectedResultRef.current = data;
    _setSelectedResult(data);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    hideOptions();
  });

  function chooseResult(r: Result<ResultType>, e:any) {
    e.stopPropagation();
    setSelectedResult(r);
    onChooseValue(r);
    hideOptions();
  }

  const hideOptions = () => {
    setIsSelected(false);
  };

  function selectParameter(e?:any) {
    e?.stopPropagation();
    setIsSelected(true);
  }


  return (
    <div ref={wrapperRef} onClick={selectParameter} className={styles.wrapper}>
      <style jsx>
        {`
          .${styles.wrapper} {
            width: ${width ? width + "px" : "100%"};
          }
        `}
      </style>
      <BasicInputField
        label={label}
        hint={hint}
        help={help}
        onChange={() => {}}
        readOnly={true}
        onFocus={selectParameter}
        onUnfocus={hideOptions}
        isDisabled={isDisabled}
        error={undefined}
        initialValue={selectedResult?.title}
        clearable={false}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45.171"
            height="25.085"
            viewBox="0 0 45.171 25.085"
          >
            <path
              id="Path_6416"
              data-name="Path 6416"
              d="M27.585,40.585a2.5,2.5,0,0,1-1.768-.732L5.732,19.768a2.5,2.5,0,0,1,3.536-3.536L27.585,34.55,45.9,16.232a2.5,2.5,0,1,1,3.536,3.536L29.353,39.853A2.5,2.5,0,0,1,27.585,40.585Z"
              transform="translate(-5 -15.5)"
              fill="#8d8980"
            />
          </svg>
        }
      />
      <div
        className={`${styles.options_wrapper} ${
          isSelected && (results.length !== 0 || error)
            ? styles.options_wrapper_open
            : ""
        }`}
      >
        {results.map((result: Result<ResultType>) => {
          let optionClass = randstr("result_");
          return (
            <div
              key={randstr("_resu")}
              onClick={(e) => {
                chooseResult(result, e);
              }}
              className={styles.option}
            >
              {
                <div
                  className={
                    styles.option_icon +
                    " " +
                    optionClass +
                    " " +
                    (!result.iconImageUrl ? styles.option_icon_mock : "")
                  }
                ></div>
              }
              <div className={styles.option_info}>
                <div className={styles.option_title}>{result.title}</div>
                <div className={styles.option_subtitle}>{result.subtitle}</div>
              </div>
            </div>
          );
        })}

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}
