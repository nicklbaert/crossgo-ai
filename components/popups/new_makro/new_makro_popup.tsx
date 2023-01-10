import { uuidv4 } from "@firebase/util";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/authUserContext";
import { searchElement } from "../../../helpers/api/content";
import { makroschritteColl } from "../../../helpers/collections";
import { Makroschritt, Methode } from "../../../helpers/types";
import { ActionButton, buttonStyle } from "../../buttons/ActionButton";
import { BasicInputField } from "../../input_fields/basic/input_field";
import { Result } from "../../input_fields/basic_dropdown/basic_dropdown";
import { SearchableDropdown } from "../../input_fields/search_dropdown/search_dropdown";
import { Spacer } from "../../spacer/Spacers";

import styles from "./new_makro_popup.module.css";

export { NewMakroPopup };

function NewMakroPopup({
  onSave,
  onCancel,
}: {
  onSave: (makro: Makroschritt) => void;
  onCancel: () => void;
}) {
  const [newMakroschritt, setNewMakroschritt] = useState<Makroschritt | null>(null);

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <SearchableDropdown<Makroschritt>
          label="Name wählen"
          allowCustomInput={true}
          onCustomInput={(s: string) => {
            setNewMakroschritt({
              name: s,
              used_by: [user.uid] as string[],
            } as Makroschritt);
          }}
          onChooseValue={(result: Result<Makroschritt> | null) => {
            if (!result) {
              setNewMakroschritt(null);
              return;
            }
            setNewMakroschritt(result.value as Makroschritt);
          }}
          searchFunction={async (search: string): Promise<Result<Makroschritt>[]> => {
            return (await searchElement<Makroschritt>(makroschritteColl, search)).map(
              (makro) =>
                ({
                  value: makro,
                  title: makro.name,
                  subtitle: makro.used_by.length.toString(),
                } as Result<Makroschritt>)
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
            await onSave(newMakroschritt!);
            setLoading(false);
          }}
          isDisabled={!newMakroschritt}
          title="Speichern"
        />
      </div>
    </div>
  );
}
