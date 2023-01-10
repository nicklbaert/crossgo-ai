import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AppLayout } from '../../../components/app_layout/app_layout';
import {
  ActionButton,
  buttonStyle,
} from '../../../components/buttons/ActionButton';
import { ElementBox } from '../../../components/element_box/element_box';
import { BasicInputField } from '../../../components/input_fields/basic/input_field';
import { Result } from '../../../components/input_fields/basic_dropdown/basic_dropdown';
import { method_presets } from '../../../components/input_fields/default_values';
import { SearchableDropdown } from '../../../components/input_fields/search_dropdown/search_dropdown';
import { NewMethodPopup } from '../../../components/popups/new_method/new_method_popup';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { Spacer } from '../../../components/spacer/Spacers';
import { useAuth } from '../../../context/authUserContext';
import { Popup, usePopup } from '../../../context/popupContext';
import {
  addMethodeToSchwerpunkt,
  createSubElement,
  getSchwerpunkt,
} from '../../../helpers/api/content';
import { methodeDoc, methodenColl } from '../../../helpers/collections';
import { Methode, Schwerpunkt } from '../../../helpers/types';
import { guid } from '../../../helpers/util';
import styles from '../../../styles/Dashboard.module.css';

const SchwerpunktPage: NextPage = ({
  makeSwitch,
  social,
}: {
  makeSwitch?: () => void;
  social?: boolean;
}) => {
  let { schwerpunkt_id } = useRouter().query as { schwerpunkt_id: string };

  let { openPopup, isPopupOpen, closePopup } = usePopup();

  let [schwerpunkt, setSchwerpunkt] = useState<Schwerpunkt | null>(null);

  let { user } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getSchwerpunkt(schwerpunkt_id).then((s) => {
        if (s) setSchwerpunkt(s);
        setLoading(false);
      });
    }
  }, [schwerpunkt_id]);

  return (
    <ProtectedRoute>
      <AppLayout
        title={schwerpunkt?.name ?? 'Schwerpunkt'}
        makeSwitch={makeSwitch}
        social={social}
        backTitle={'Zurück'}
        onBack={() => {
          window.history.back();
        }}
        headingButton={
          <ActionButton
            onClick={() => {
              openPopup({
                title: 'Methode hinzufügen',
                subtitle: 'Erstelle deine eigene Methode',
                content: (
                  <NewMethodPopup
                    onSave={async (m: Methode) => {
                      let methode = (await createSubElement(
                        user!.uid,
                        m,
                        methodeDoc
                      )) as Methode;
                      await addMethodeToSchwerpunkt(
                        user!.uid,
                        schwerpunkt_id,
                        methode
                      );
                      await getSchwerpunkt(schwerpunkt_id).then((s) => {
                        if (s) setSchwerpunkt(s);
                        setLoading(false);
                      });
                      closePopup();
                    }}
                    onCancel={closePopup}
                  />
                ),
              } as Popup);
            }}
            width={'200px'}
            height={'35px'}
            title="Methode hinzufügen"
          />
        }
        content={
          <div className={styles.wrapper}>
            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : (
              <div className={styles.schwerpunkte}>
                {schwerpunkt?.methoden &&
                  (schwerpunkt?.methoden as Methode[]).map((m, index) => (
                    <div key={m.id} className={styles.schwerpunkt}>
                      <ElementBox
                        element={m}
                        onDelete={async () => {
                          await getSchwerpunkt(schwerpunkt_id).then((s) => {
                            if (s) setSchwerpunkt(s);
                            setLoading(false);
                          });
                        }}
                        title="Methode"
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

export default SchwerpunktPage;
