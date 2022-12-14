import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { AppLayout } from "../../../../components/app_layout/app_layout";
import {
  ActionButton,
  buttonStyle,
} from "../../../../components/buttons/ActionButton";
import { BasicInputField } from "../../../../components/input_fields/basic/input_field";
import { Result } from "../../../../components/input_fields/basic_dropdown/basic_dropdown";
import { method_presets } from "../../../../components/input_fields/default_values";
import { SearchableDropdown } from "../../../../components/input_fields/search_dropdown/search_dropdown";
import { NewDetailPopup } from "../../../../components/popups/new_detail/new_detail_popup";
import { NewMethodPopup } from "../../../../components/popups/new_method/new_method_popup";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import { Spacer } from "../../../../components/spacer/Spacers";
import { useAuth } from "../../../../context/authUserContext";
import { Popup, usePopup } from "../../../../context/popupContext";
import {
  addDetailToMethode,
  addMethodeToSchwerpunkt,
  createSubElement,
} from "../../../../helpers/api/content";
import { detailDoc, detailsColl, methodenColl } from "../../../../helpers/collections";
import { Detail, Methode } from "../../../../helpers/types";
import { guid } from "../../../../helpers/util";
import styles from "../../../../styles/Dashboard.module.css";

const MethodePage: NextPage = ({
  makeSwitch,
  social,
}: {
  makeSwitch?: () => void;
  social?: boolean;
}) => {
  let { schwerpunkt_id, methode_id } = useRouter().query as {
    schwerpunkt_id: string;
    methode_id: string;
  };

  let { openPopup, isPopupOpen, closePopup } = usePopup();

  let { user } = useAuth();
  return (
    <ProtectedRoute>
      <AppLayout
        title={"Methode"}
        makeSwitch={makeSwitch}
        social={social}
        backTitle={"Zurück"}
        onBack={() => {}}
        headingButton={
          <ActionButton
            onClick={() => {
              openPopup({
                title: "Neues Detail",
                subtitle: "Erstelle ein neues Detail",
                content: (
                  <NewDetailPopup
                    onSave={async (d: Detail) => {
                      let detail = (await createSubElement(
                        user!.uid,
                        d,
                        detailDoc,
                      )) as Detail;
                      await addDetailToMethode(methode_id, detail);
                      closePopup();
                    }}
                    onCancel={closePopup}
                  />
                ),
              } as Popup);
            }}
            width={"160px"}
            height={"45px"}
            title="Neues Detail"
          />
        }
        content={<div className={styles.wrapper}></div>}
      />
    </ProtectedRoute>
  );
};

export default MethodePage;
