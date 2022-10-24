import styles from "./search_dropdown.module.css";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { generateUID, randstr, useOutsideAlerter } from "../../../helpers/util";
import { BasicInputField } from "../basic/input_field";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Result } from "../basic_dropdown/basic_dropdown";

export { SearchableDropdown };

SearchableDropdown.propTypes = {
  label: PropTypes.string,
  help: PropTypes.string,
  hint: PropTypes.string,
  onChooseValue: PropTypes.func,
  allowCustomInput: PropTypes.bool,
  onCustomInput: PropTypes.func,
  width: PropTypes.number,
  initialResult: PropTypes.any,
  searchFunction: PropTypes.any,
  maxResults: PropTypes.number,
  showIconInResult: PropTypes.bool,
  emptyResultsText: PropTypes.string,
  defaultResults: PropTypes.array,
  isDisabled: PropTypes.bool,
};

SearchableDropdown.defaultProps = {
  label: undefined,
  hint: undefined,
  width: undefined,
  help: undefined,
  allowCustomInput: false,
  onCustomInput: (s: string) => {},
  onChooseValue: (r: Result<any>) => {},
  initialResult: undefined,
  icon: undefined,
  searchFunction: (s: string) => {},
  maxResults: 20,
  showIconInResult: false,
  emptyResultsText: "Keine Ergebnisse",
  defaultResults: [],
  isDisabled: false,
};

type SearchableDropdownArguments<T> = {
  label?: string;
  hint?: string;
  help?: string;
  onChooseValue: any;
  allowCustomInput: boolean;
  onCustomInput: any;
  width?: number;
  initialResult?: Result<T>;
  icon?: JSX.Element;
  searchFunction: (s: string) => Promise<Result<T>[]>;
  maxResults?: number;
  showIconInResult?: boolean;
  emptyResultsText?: string;
  defaultResults: Result<T>[];
  isDisabled: boolean;
};

function SearchableDropdown<ResultType>({
  label,
  hint,
  width,
  help,
  onChooseValue,
  allowCustomInput,
  onCustomInput,
  initialResult,
  searchFunction,
  maxResults,
  showIconInResult,
  emptyResultsText,
  defaultResults,
  isDisabled,
  ...props
}: SearchableDropdownArguments<ResultType>) {
  const [results, setResults] = useState(defaultResults as any[]);

  useEffect(() => {
    if (!isSelected) setResults(defaultResults);
  }, [defaultResults]);

  useEffect(() => {
    if (initialResult && selectedResult?.value !== initialResult.value) {
      setSelectedResult(initialResult);
    }
  }, [initialResult]);

  const [error, setError] = useState(null as string | null);

  const inputRef = useRef(null as any);

  const [isSelected, setIsSelected] = useState(false);

  const [selectedResult, _setSelectedResult] = useState(
    initialResult ? initialResult : null
  );

  const selectedResultRef = useRef(selectedResult);
  const setSelectedResult = (data: any) => {
    selectedResultRef.current = data;
    _setSelectedResult(data);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    hideOptions();
  });

  function onInput(s: string) {
    if (allowCustomInput) {
      setSelectedResult({
        title: s,
        value: s,
      } as Result<string>);
      onCustomInput(s);
    } else {
      onChooseValue(null);
      setSelectedResult(null);
    }

    console.log("SEARCH LOCATION input s: ", s);

    if (s.trim().length === 0) {
      setResults(defaultResults);
      return;
    }

    searchFunction(s).then((results: Result<ResultType>[]) => {
      setError("");
      if (!results) {
        return;
      }

      if (results.length == 0 && !allowCustomInput) {
        setError(emptyResultsText ?? null);
      }

      console.log("SEARCH LOCATION found results: ", results);

      setResults(results.slice(0, maxResults));
    });
  }

  function chooseResult(r: Result<ResultType>, e: any) {
    e.stopPropagation();
    setSelectedResult(r);
    onChooseValue(r);
    hideOptions(true);
  }

  function clearInputValue() {
    inputRef.current.clear();
    setResults(defaultResults);
  }

  const hideOptions = (dontClear?: boolean) => {
    setIsSelected(false);
    if (!dontClear && !selectedResultRef.current && !allowCustomInput)
      clearInputValue();
  };

  function selectParameter(e?: any) {
    e?.stopPropagation();
    setIsSelected(true);
  }

  const Row = ({ index, style }: { index: number; style: any }) => {
    let result: Result<ResultType> = results[index];
    let optionClass = generateUID(20);

    return (
      <div
        style={style}
        key={randstr("_resu")}
        onClick={(e) => {
          console.log("CHOOSING RESULT: " + result);
          chooseResult(result, e);
        }}
        className={styles.option}
      >
        <div className={styles.option_info}>
          <div className={styles.option_title}>{result.title}</div>
          <div className={styles.option_subtitle}>{result.subtitle}</div>
        </div>
      </div>
    );
  };

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
        ref={inputRef}
        label={label}
        hint={hint}
        help={help}
        onChange={onInput}
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
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              itemCount={results.length}
              itemSize={70}
            >
              {Row}
            </List>
          )}
        </AutoSizer>

        {/* {results.map((result: Result<ResultType>) => {
          let optionClass = randstr("result_");
          return (
            <div
              key={randstr("_resu")}
              onClick={(e) => {
                chooseResult(result, e);
              }}
              className={styles.option}
            >
              <div
                className={
                  styles.option_icon +
                  " " +
                  optionClass +
                  " " +
                  (!result.iconImageUrl ? styles.option_icon_mock : "")
                }
              >
                {result.iconImageUrl && (
                  <CoverImage
                    src={result.iconImageUrl}
                    width={"45px"}
                    height={"45px"}
                    borderRadius={8}
                    heightMobile={"50px"}
                  />
                )}
              </div>

              <div className={styles.option_info}>
                <div className={styles.option_title}>{result.title}</div>
                <div className={styles.option_subtitle}>{result.subtitle}</div>
              </div>
            </div>
          );
        })} */}

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}
