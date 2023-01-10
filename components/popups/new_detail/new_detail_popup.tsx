import { uuidv4 } from "@firebase/util";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/authUserContext";
import { searchElement } from "../../../helpers/api/content";
import { detailsColl, methodenColl } from "../../../helpers/collections";
import { Detail, Methode } from "../../../helpers/types";
import { ActionButton, buttonStyle } from "../../buttons/ActionButton";
import { BasicInputField } from "../../input_fields/basic/input_field";
import { Result } from "../../input_fields/basic_dropdown/basic_dropdown";
import { SearchableDropdown } from "../../input_fields/search_dropdown/search_dropdown";
import { Spacer } from "../../spacer/Spacers";

import styles from "./new_detail_popup.module.css";

export { NewDetailPopup };

function NewDetailPopup({
  onSave,
  onCancel,
}: {
  onSave: (detail: Detail) => void;
  onCancel: () => void;
}) {
  const [newDetail, setNewDetail] = useState<Detail | null>(null);

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <SearchableDropdown<Detail>
          label="Name wählen"
          allowCustomInput={true}
          onCustomInput={(s: string) => {
            setNewDetail({
              name: s,
              used_by: [user.uid] as string[],
            } as Detail);
          }}
          onChooseValue={(result: Result<Detail> | null) => {
            if (!result) {
              setNewDetail(null);
              return;
            }
            setNewDetail(result.value as Detail);
          }}
          searchFunction={async (search: string): Promise<Result<Detail>[]> => {
            return (await searchElement<Detail>(detailsColl, search)).map(
              (detail) =>
                ({
                  value: detail,
                  title: detail.name,
                  subtitle: detail.used_by.length.toString(),
                } as Result<Detail>)
            );
          }}
        />
      </div>
      <div className={styles.popup_footer}>
        <ActionButton
          style={buttonStyle.secondary}
          onClick={onCancel}
          title="Abbrechen"
        />
        <Spacer type="horizontal" size={16} />
        <ActionButton
          loading={loading}
          onClick={async () => {
            setLoading(true);
            await onSave(newDetail!);
            setLoading(false);
          }}
          isDisabled={!newDetail}
          title="Speichern"
        />
      </div>
    </div>
  );
}
