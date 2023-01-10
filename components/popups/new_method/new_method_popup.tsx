import { uuidv4 } from "@firebase/util";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/authUserContext";
import { searchElement } from "../../../helpers/api/content";
import { methodenColl } from "../../../helpers/collections";
import { Methode } from "../../../helpers/types";
import { ActionButton, buttonStyle } from "../../buttons/ActionButton";
import { BasicInputField } from "../../input_fields/basic/input_field";
import { Result } from "../../input_fields/basic_dropdown/basic_dropdown";
import { SearchableDropdown } from "../../input_fields/search_dropdown/search_dropdown";
import { Spacer } from "../../spacer/Spacers";

import styles from "./new_method_popup.module.css";

export { NewMethodPopup };

function NewMethodPopup({
  onSave,
  onCancel,
}: {
  onSave: (methode: Methode) => void;
  onCancel: () => void;
}) {
  const [newMethod, setNewMethod] = useState<Methode | null>(null);

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <SearchableDropdown<Methode>
          label="Name wählen"
          allowCustomInput={true}
          onCustomInput={(s: string) => {
            setNewMethod({
              name: s,
              used_by: [user.uid] as string[],
            } as Methode);
          }}
          onChooseValue={(result: Result<Methode> | null) => {
            if (!result) {
              setNewMethod(null);
              return;
            }
            setNewMethod({
              ...result.value,
            } as Methode);
          }}
          searchFunction={async (
            search: string
          ): Promise<Result<Methode>[]> => {
            return (await searchElement<Methode>(methodenColl, search)).map(
              (methode) =>
                ({
                  value: methode,
                  title: methode.name,
                  subtitle: methode.used_by.length.toString(),
                } as Result<Methode>)
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
            await onSave(newMethod!);
            setLoading(false);
          }}
          isDisabled={!newMethod}
          title="Speichern"
        />
      </div>
    </div>
  );
}
