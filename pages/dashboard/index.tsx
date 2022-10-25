import type { NextPage } from "next";
import { useState } from "react";
import { AppLayout } from "../../components/app_layout/app_layout";
import { ActionButton } from "../../components/buttons/ActionButton";
import { BasicInputField } from "../../components/input_fields/basic/input_field";
import { Result } from "../../components/input_fields/basic_dropdown/basic_dropdown";
import { method_presets } from "../../components/input_fields/default_values";
import { SearchableDropdown } from "../../components/input_fields/search_dropdown/search_dropdown";
import { Spacer } from "../../components/spacer/Spacers";
import { guid } from "../../helpers/util";
import styles from "../../styles/Dashboard.module.css";

const Home: NextPage = () => {
  const [showButtonOptions, setShowButtonOptions] = useState(false);

  const dashboardTabs = {
    default: "default",
    step_1: "step_1",
    step_2: "step_2",
    step_3: "step_3",
  };

  type Detail = {
    name: string;
    macros: string[];
  };

  type Method = {
    name: string;
    details: Detail[];
  };

  const [newMethod, setNewMethod] = useState(null as Method | null);

  const [currentTab, setCurrentTab] = useState(dashboardTabs.default);

  function getTitle() {
    switch (currentTab) {
      case dashboardTabs.step_1:
        return "Neue Methode erstellen 1/3";
      case dashboardTabs.step_2:
        return "Neue Methode erstellen 2/3";
      case dashboardTabs.step_3:
        return "Neue Methode erstellen 3/3";
      default:
        return "Übersicht";
    }
  }

  function getSubTitle() {
    if (currentTab == dashboardTabs.default)
      return "Hier siehst du alle deine Methoden";
    else return undefined;
  }

  function getHeadingButton() {
    if (currentTab == dashboardTabs.default)
      return (
        <div className={styles.new_method_button}>
          <ActionButton
            onClick={() => {}}
            width={"160px"}
            height={"45px"}
            title="Neue Methode"
          />
          <div
            className={
              styles.button_options +
              " " +
              (showButtonOptions ? styles.button_options_visible : "")
            }
          >
            <div
              onClick={() => setCurrentTab(dashboardTabs.step_1)}
              className={styles.button_option}
            >
              Selbst anlegen{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.764"
                height="17.764"
                viewBox="0 0 17.764 17.764"
              >
                <path
                  id="Path_28"
                  data-name="Path 28"
                  d="M-4395.179-477.675a1.5,1.5,0,0,1,0-2.122l4.821-4.821H-4401.5a1.5,1.5,0,0,1-1.5-1.5,1.5,1.5,0,0,1,1.5-1.5h11.143l-4.822-4.821a1.5,1.5,0,0,1,0-2.122,1.5,1.5,0,0,1,2.122,0l7.383,7.381a1.5,1.5,0,0,1,.273.377l0,0,.012.025.007.014.007.016.011.024,0,.006a1.5,1.5,0,0,1,.123.6,1.5,1.5,0,0,1-.124.6v0l-.013.029,0,.008-.011.023-.006.013-.009.018-.009.017-.007.013-.011.021-.006.01-.013.022,0,.008-.015.023,0,.007-.016.024,0,.006-.017.024,0,.006-.017.023,0,.006-.017.022-.006.009-.016.02-.008.01-.015.018-.011.013-.013.015-.016.017-.009.01-.023.024,0,0-7.383,7.383a1.5,1.5,0,0,1-1.061.439A1.5,1.5,0,0,1-4395.179-477.675Z"
                  transform="translate(4403 495)"
                  fill="#8133ff"
                />
              </svg>
            </div>
            <div className={styles.button_option}>
              Als Interviewer anlegen
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.764"
                height="17.764"
                viewBox="0 0 17.764 17.764"
              >
                <path
                  id="Path_28"
                  data-name="Path 28"
                  d="M-4395.179-477.675a1.5,1.5,0,0,1,0-2.122l4.821-4.821H-4401.5a1.5,1.5,0,0,1-1.5-1.5,1.5,1.5,0,0,1,1.5-1.5h11.143l-4.822-4.821a1.5,1.5,0,0,1,0-2.122,1.5,1.5,0,0,1,2.122,0l7.383,7.381a1.5,1.5,0,0,1,.273.377l0,0,.012.025.007.014.007.016.011.024,0,.006a1.5,1.5,0,0,1,.123.6,1.5,1.5,0,0,1-.124.6v0l-.013.029,0,.008-.011.023-.006.013-.009.018-.009.017-.007.013-.011.021-.006.01-.013.022,0,.008-.015.023,0,.007-.016.024,0,.006-.017.024,0,.006-.017.023,0,.006-.017.022-.006.009-.016.02-.008.01-.015.018-.011.013-.013.015-.016.017-.009.01-.023.024,0,0-7.383,7.383a1.5,1.5,0,0,1-1.061.439A1.5,1.5,0,0,1-4395.179-477.675Z"
                  transform="translate(4403 495)"
                  fill="#8133ff"
                />
              </svg>
            </div>
          </div>
        </div>
      );
    else return undefined;
  }

  function getBack() {
    switch (currentTab) {
      case dashboardTabs.step_1:
        return "Übersicht";
      case dashboardTabs.step_2:
        return "Schritt 1";
      case dashboardTabs.step_3:
        return "Schritt 2";
      default:
        return undefined;
    }
  }

  function onBack() {
    switch (currentTab) {
      case dashboardTabs.step_1:
        setCurrentTab(dashboardTabs.default);
        break;
      case dashboardTabs.step_2:
        setCurrentTab(dashboardTabs.step_1);
        break;
      case dashboardTabs.step_3:
        setCurrentTab(dashboardTabs.step_2);
        break;
      default:
        break;
    }
  }

  // function changeDetailNameAtIndex(index: number, value: string) {
  //   let newDetails = [...newMethod!.details];

  //   if (!newDetails[index]) newDetails[index] = { name: value, macros: [] };

  //   newDetails[index].name = value;
  //   setNewMethod({ ...newMethod, details: newDetails } as Method);
  // }

  // function changeMacroAtIndex(
  //   detailIndex: number,
  //   index: number,
  //   value: string
  // ) {
  //   let newMacros = [...newMethod!.details[detailIndex].macros];
  //   newMacros[index] = value;
  // }

  function getContent() {
    switch (currentTab) {
      case dashboardTabs.step_1:
        return (
          <div className={styles.wrapper}>
            <div className={styles.subtitle}>
              Gib deiner Methode einen Namen
            </div>
            <BasicInputField
              label="Name deiner Methode"
              onChange={(val: string) => {
                if (!newMethod) {
                  setNewMethod({
                    name: val,
                    details: [],
                  });
                } else {
                  setNewMethod({
                    ...newMethod,
                    name: val,
                  });
                }
              }}
            />
            <Spacer type="vertical" size={64} />
            <div className={styles.subtitle}>
              ODER verwende einen bestehenden
            </div>
            <SearchableDropdown<string>
              label="Name deiner Methode"
              onChooseValue={(val: string) => {}}
              defaultResults={method_presets.map((preset) => {
                return {
                  title: preset,
                  value: preset,
                } as Result<string>;
              })}
              searchFunction={async (val: string) => {
                return method_presets
                  .filter((preset) => preset.toLowerCase().replaceAll(' ', '').includes(val.toLowerCase().replaceAll(' ', '')))
                  .map((preset) => {
                    return {
                      title: preset,
                      value: preset,
                    } as Result<string>;
                  });
              }}
            />
             <Spacer type="vertical" size={40} />
            <ActionButton
              onClick={() => setCurrentTab(dashboardTabs.step_2)}
              width={"160px"}
              height={"45px"}
              title="Weiter"
            />
          </div>
        );

      case dashboardTabs.step_2:
        return (
          <div className={styles.wrapper}>
            <div className={styles.subtitle}>
              Lege die 5 Details für die Methode fest
            </div>
            {[0, 1, 2, 3, 4].map((index) => {
              return (
                <div key={index}>
                  <BasicInputField
                    label={`Detail ${index + 1}`}
                    onChange={(val: string) => {
                      //changeDetailNameAtIndex(index, val);
                    }}
                  />
                  <Spacer type="vertical" size={24} />
                </div>
              );
            })}

            <Spacer type="vertical" size={40} />
            <ActionButton
              onClick={() => setCurrentTab(dashboardTabs.step_3)}
              width={"160px"}
              height={"45px"}
              title="Weiter"
            />
          </div>
        );
      case dashboardTabs.step_3:
        return (
          <div className={styles.wrapper}>
            <div className={styles.subtitle}>
              Lege für jedes Detail 5 Makros fest
            </div>
            {[0, 1, 2, 3, 4].map((index) => {
              return (
                <div key={index}>
                  <div className={styles.subtitle}>{`Detail ${index + 1}`}</div>
                  {[0, 1, 2, 3, 4].map((makroIndex) => {
                    return (
                      <div key={guid()}>
                        <BasicInputField
                          label={`Makro ${makroIndex + 1}`}
                          onChange={(val: string) => {
                            //changeDetailNameAtIndex(index, val);
                          }}
                        />
                        <Spacer type="vertical" size={24} />
                      </div>
                    );
                  })}
                  <Spacer type="vertical" size={32} />
                </div>
              );
            })}

            <Spacer type="vertical" size={40} />
            <ActionButton
              onClick={() => setCurrentTab(dashboardTabs.default)}
              width={"160px"}
              height={"45px"}
              title="Weiter"
            />
          </div>
        );
      default:
        return (
          <div className={styles.wrapper}>
            <div className={styles.method}>
              <div className={styles.method_left}>
                <div className={styles.method_icon}></div>
                <div className={styles.method_content}>
                  <div className={styles.method_title}>Meine Methode 1</div>
                  <div className={styles.method_subtitle}>
                    Das ist meine erste Methode
                  </div>
                </div>
              </div>
              <div className={styles.edit_button}>Bearbeiten</div>
            </div>
            <div className={styles.method}>
              <div className={styles.method_left}>
                <div className={styles.method_icon}></div>
                <div className={styles.method_content}>
                  <div className={styles.method_title}>Meine Methode 2</div>
                  <div className={styles.method_subtitle}>
                    Das ist meine zweite Methode
                  </div>
                </div>
              </div>
              <div className={styles.edit_button}>Bearbeiten</div>
            </div>
          </div>
        );
    }
  }

  return (
    <AppLayout
      title={getTitle()}
      subtitle={getSubTitle()}
      backTitle={getBack()}
      onBack={onBack}
      headingButton={getHeadingButton()}
      content={getContent()}
    />
  );
};

export default Home;
