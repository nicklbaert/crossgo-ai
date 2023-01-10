import { uuidv4 } from "@firebase/util";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/authUserContext";
import { colorOptions, searchElement } from "../../../helpers/api/content";
import { methodenColl, schwerpunkteColl } from "../../../helpers/collections";
import { Schwerpunkt } from "../../../helpers/types";
import { ActionButton, buttonStyle } from "../../buttons/ActionButton";
import { BasicInputField } from "../../input_fields/basic/input_field";
import { Result } from "../../input_fields/basic_dropdown/basic_dropdown";
import { SearchableDropdown } from "../../input_fields/search_dropdown/search_dropdown";
import { Spacer } from "../../spacer/Spacers";

import styles from "./new_schwerpunkt_popup.module.css";

export { NewSchwerpunktPopup };

function NewSchwerpunktPopup({
  onSave,
  onCancel,
}: {
  onSave: (methode: Schwerpunkt, color: string | undefined) => void;
  onCancel: () => void;
}) {
  const [newSchwerpunkt, setNewSchwerpunkt] = useState<Schwerpunkt | null>(
    null
  );

  const [color, setColor] = useState<string | undefined>(undefined);

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <SearchableDropdown<Schwerpunkt>
          label="Name wählen"
          allowCustomInput={true}
          onCustomInput={(s: string) => {
            setNewSchwerpunkt({
              name: s,
              usedBy: [user.uid] as string[],
            } as Schwerpunkt);
          }}
          onChooseValue={(result: Result<Schwerpunkt> | null) => {
            if (!result) {
              setNewSchwerpunkt(null);
              return;
            }
            setNewSchwerpunkt(result.value as Schwerpunkt);
          }}
          searchFunction={async (
            search: string
          ): Promise<Result<Schwerpunkt>[]> => {
            return (
              await searchElement<Schwerpunkt>(schwerpunkteColl, search)
            ).map(
              (sp) =>
                ({
                  value: sp,
                  title: sp.name,
                  subtitle: sp.usedBy?.length?.toString() ?? "Keine Nutzer",
                } as Result<Schwerpunkt>)
            );
          }}
        />
        <Spacer type="vertical" size={32} />
        <div className={styles.colors_wrapper}>
          <div className={styles.color_label}>Farbe wählen</div>
          <div className={styles.color_menu}>
            {colorOptions.map((c, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: c,
                  }}
                  onClick={() => {
                    setColor(c);
                  }}
                  className={
                    styles.color_option +
                    " " +
                    (color === c ? styles.selected : "")
                  }
                ></div>
              );
            })}
          </div>
        </div>
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
            await onSave(newSchwerpunkt!, color);
            setLoading(false);
          }}
          isDisabled={!newSchwerpunkt}
          title="Speichern"
        />
      </div>
    </div>
  );
}
