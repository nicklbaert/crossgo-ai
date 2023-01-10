import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AppLayout } from "../../components/app_layout/app_layout";
import {
  ActionButton,
  buttonStyle,
} from "../../components/buttons/ActionButton";
import { BasicInputField } from "../../components/input_fields/basic/input_field";
import { Result } from "../../components/input_fields/basic_dropdown/basic_dropdown";
import { method_presets } from "../../components/input_fields/default_values";
import { SearchableDropdown } from "../../components/input_fields/search_dropdown/search_dropdown";
import { NewMethodPopup } from "../../components/popups/new_method/new_method_popup";
import { NewSchwerpunktPopup } from "../../components/popups/new_schwerpunkt/new_schwerpunkt_popup";
import ProtectedRoute from "../../components/ProtectedRoute";
import { SchwerpunktBox } from "../../components/schwerpunkt_box/element_box";
import { Spacer } from "../../components/spacer/Spacers";
import { useAuth } from "../../context/authUserContext";
import { Popup, usePopup } from "../../context/popupContext";
import {
  colorOptions,
  createSchwerpunkt,
  deleteSchwerpunktFromUser,
  getSchwerpunkte,
  updateSchwerpunktColor,
} from "../../helpers/api/content";
import { methodenColl } from "../../helpers/collections";
import {
  Methode,
  Schwerpunkt,
  UserSchwerpunkt,
  UserType,
} from "../../helpers/types";
import { guid } from "../../helpers/util";
import styles from "../../styles/Dashboard.module.css";

const Dashboard: NextPage = ({
  makeSwitch,
  social,
}: {
  makeSwitch?: () => void;
  social?: boolean;
}) => {
  let router = useRouter();
  let { openPopup, isPopupOpen, closePopup } = usePopup();

  let [schwerpunkte, setSchwerpunkte] = useState<UserSchwerpunkt[]>([]);

  const [loading, setLoading] = useState(true);

  let { user } = useAuth() as { user: UserType | null };

  useEffect(() => {
    getSchwerpunkte(user!.schwerpunkte).then((s) => {
      setLoading(false);
      if (s) {
        console.log(s);
        setSchwerpunkte(s);
      }
    });
  }, [user]);

  return (
    <ProtectedRoute>
      <AppLayout
        title={"Dashboard"}
        makeSwitch={makeSwitch}
        social={social}
        
        headingButton={
          <ActionButton
            onClick={() => {
              openPopup({
                title: "Neuer Schwerpunkt",
                subtitle: "Erstelle einen Schwerpunkt",
                content: (
                  <NewSchwerpunktPopup
                    onSave={async (
                      s: Schwerpunkt,
                      color: string | undefined
                    ) => {
                      //create Schwerpunkt
                      let c = await createSchwerpunkt(user!.uid!, s, color);

                      //if not already in schwerpunkte, add it
                      if (
                        schwerpunkte.filter((schwer) => schwer.id === s.id)
                          .length === 0 &&
                        c
                      ) {
                        setSchwerpunkte([
                          ...schwerpunkte,
                          {
                            data: s,
                            id: s.id,
                            color: c,
                          } as UserSchwerpunkt,
                        ]);
                      }
                      closePopup();
                    }}
                    onCancel={closePopup}
                  />
                ),
              } as Popup);
            }}
            width={"200px"}
            height={"45px"}
            title="Neuer Schwerpunkt"
          />
        }
        content={
          <div className={styles.wrapper}>
            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : (
              <div className={styles.schwerpunkte}>
                {schwerpunkte.map((s, index) => (
                  <div
                    onClick={() => {
                      router.push(`/dashboard/${s.id}`);
                    }}
                    key={s.id}
                    className={styles.schwerpunkt}
                  >
                    <SchwerpunktBox
                      element={s}
                      onDelete={() => {
                        deleteSchwerpunktFromUser(
                          user!.uid!,
                          s.id!,
                          schwerpunkte
                        );
                        setSchwerpunkte(
                          schwerpunkte.filter((schwer) => schwer.id !== s.id)
                        );
                      }}
                      onColorUpdate={(c: string) => {
                        updateSchwerpunktColor(
                          user!.uid!,
                          s.id!,
                          schwerpunkte,
                          c
                        );
                      }}
                      title="Schwerpunkt"
                      onClick={() => {}}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        }
      />
    </ProtectedRoute>
  );
};

export default Dashboard;
