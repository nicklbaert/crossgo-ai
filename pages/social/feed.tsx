import type { NextPage } from "next";
import { AppLayout } from "../../components/app_layout/app_layout";
import { ActionButton } from "../../components/buttons/ActionButton";
import ProtectedRoute from "../../components/ProtectedRoute";

import styles from "../../styles/social/social.module.css";

const Feed: NextPage = ({
  makeSwitch,
  social,
}: {
  makeSwitch?: () => void;
  social?: boolean;
}) => {
  return (
    <ProtectedRoute>
      <AppLayout
        makeSwitch={makeSwitch}
        social={social}
        title={"Feed"}
        headingButton={<ActionButton title="Posten" />}
        content={<div className={styles.wrapper}></div>}
      />
    </ProtectedRoute>
  );
};

export default Feed;
