import { UserCredential } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  UploadResult,
} from "firebase/storage";
import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AppLayout } from "../../components/app_layout/app_layout";
import {
  ActionButton,
  buttonStyle,
} from "../../components/buttons/ActionButton";
import { Spinner } from "../../components/buttons/spinner/Spinner";
import { FittedImage } from "../../components/cover_image/fitted_image";
import { BasicInputField } from "../../components/input_fields/basic/input_field";
import { TextField } from "../../components/input_fields/text_field/text_field";
import { Layout } from "../../components/layout/layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Spacer } from "../../components/spacer/Spacers";
import { useAuth, UserType } from "../../context/authUserContext";
import { updateUser } from "../../helpers/api_wrapper";
import styles from "../../styles/profile/settings.module.css";

const ProfileSettings: NextPage = ({
  makeSwitch,
  social,
}: {
  makeSwitch?: () => void;
  social?: boolean;
}) => {
  let router = useRouter();

  const { user, setUser, logOut } = useAuth();

  const [displayName, setDisplayName] = useState(null as string | null);
  const display_name_ref = useRef(null as any);
  const [bio, setBio] = useState(null as string | null);
  const bio_ref = useRef(null as any);
  const [avatar, setAvatar] = useState(null as string | null);

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [header, setHeader] = useState(null as string | null);
  const [headerLoading, setHeaderLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setBio(user.bio);
      setAvatar(user.avatar);
      setHeader(user.header);
    }
  }, [user]);

  const somethingChanged = () => {
    if (user) {
      if (user.displayName !== displayName) return true;
      if (user.bio !== bio) return true;
      if (user.avatar !== avatar) return true;
      if (user.header !== header) return true;
    }
    return false;
  };

  const reset = () => {
    display_name_ref.current?.updateInput(user.displayName);
    bio_ref.current?.updateInput(user.bio);
    setBio(user.bio);
    setDisplayName(user.displayName);
    setAvatar(user.avatar);
    setHeader(user.header);
  };

  const onSubmit = async () => {
    setSubmitLoading(true);
    try {
      await updateUser({
        ...user,
        displayName: displayName,
        bio: bio,
        avatar,
        header,
      } as UserType);
      setUser({
        ...user,
        displayName: displayName,
        bio: bio,
        avatar,
        header,
      });
    } catch (error: any) {
      console.log(error.message);
    }
    setSubmitLoading(false);
  };

  async function selectAvatarImage(event: any) {
    if (event.target.files) {
      setAvatarLoading(true);
      //Populate new image items with local values
      let url = await uploadImage(
        event.target.files[0],
        `${user.uid}/profile_pics/${generateUniqueID()}.jpg`
      );
      setAvatarLoading(false);
      setAvatar(url);
    }
  }

  async function selectHeaderImage(event: any) {
    if (event.target.files) {
      setHeaderLoading(true);
      //Populate new image items with local values
      let url = await uploadImage(
        event.target.files[0],
        `${user.uid}/headers/${generateUniqueID()}.jpg`
      );
      setHeaderLoading(false);
      setHeader(url);
    }
  }

  function generateUniqueID() {
    return Math.random().toString(36).substr(2, 9);
  }

  async function uploadImage(img: File, path: string): Promise<string | null> {
    if (!img) return null;

    // Create a root reference
    const storage = getStorage();

    // Create a reference to 'userID/imageID.jpg'
    const storageRef = ref(storage, path);

    let res: UploadResult = await uploadBytes(storageRef, img);

    return await getDownloadURL(res.ref);
  }

  type TabContent = {
    title: string;
    key: string;
    content: JSX.Element;
  };

  type Tabs = {
    profile_settings: TabContent;
  };

  const tabs: Tabs = {
    profile_settings: {
      key: "profile_settings",
      title: "Dein Profil",
      content: (
        <div className={styles.content}>
          <div className={styles.title_image}>
            {header && (
              <FittedImage
                src={header}
                height={"300px"}
                width={"100%"}
                borderRadius={24}
              />
            )}
            <div className={styles.title_image_overlay}>
              <div className={styles.title_upload}>
                <div className={styles.heading}>Titelbild</div>
                <div className={styles.selector_wrapper}>
                  {!headerLoading && (
                    <input
                      className={styles.image_selector}
                      type="file"
                      onChange={selectHeaderImage}
                    />
                  )}
                  {!headerLoading && (
                    <span>
                      {!header ? "Bild hochladen" : "Bild aktualisieren"}
                    </span>
                  )}

                  {headerLoading && <Spinner />}
                </div>
              </div>
            </div>
            <div className={styles.avatar_upload}>
              {!avatar && (
                <div className={styles.avatar_circle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="31.5"
                    height="36"
                    viewBox="0 0 31.5 36"
                  >
                    <path
                      id="Icon_awesome-user"
                      data-name="Icon awesome-user"
                      d="M15.75,18a9,9,0,1,0-9-9A9,9,0,0,0,15.75,18Zm6.3,2.25H20.876a12.24,12.24,0,0,1-10.252,0H9.45A9.452,9.452,0,0,0,0,29.7v2.925A3.376,3.376,0,0,0,3.375,36h24.75A3.376,3.376,0,0,0,31.5,32.625V29.7A9.452,9.452,0,0,0,22.05,20.25Z"
                      fill="#c4bcb1"
                    />
                  </svg>
                </div>
              )}
              {avatar && (
                <FittedImage
                  src={avatar}
                  height={"200px"}
                  width={"200px"}
                  borderRadius={1000}
                />
              )}
              <div className={styles.avatar_upload_right}>
                <div className={styles.avatar_upload_right_left}>
                  <div className={styles.heading}>Profilbild</div>
                  <div className={styles.selector_wrapper}>
                    {!avatarLoading && (
                      <input
                        className={styles.image_selector}
                        type="file"
                        onChange={selectAvatarImage}
                      />
                    )}
                    {!avatarLoading && (
                      <span>
                        {!avatar ? "Bild hochladen" : "Bild aktualisieren"}
                      </span>
                    )}

                    {avatarLoading && <Spinner />}
                  </div>
                </div>
                <div className={styles.avatar_upload_right_right}>
                  <ActionButton
                    style={buttonStyle.secondary}
                    onClick={reset}
                    isDisabled={!somethingChanged()}
                    title="Abbrechen"
                  />
                  <Spacer type="horizontal" size={8} />
                  <ActionButton
                    isDisabled={!somethingChanged()}
                    onClick={onSubmit}
                    loading={submitLoading}
                    title="Speichern"
                  />
                </div>
              </div>
            </div>
          </div>

          <Spacer type="vertical" size={64} />
          <div className={styles.element_row}>
            <div className={styles.element_title}>
              Vollständiger Name <span>*</span>
            </div>
            <div className={styles.element_input}>
              <BasicInputField
                label="Vollständiger Name"
                ref={display_name_ref}
                onChange={(s: string) => {
                  setDisplayName(s);
                }}
                initialValue={user.displayName}
              />
            </div>
          </div>
          <Spacer type="vertical" size={24} />
          <div className={styles.element_row}>
            <div className={styles.element_title}>
              Deine Biografie<span>*</span>
            </div>
            <div className={styles.element_input}>
              <TextField
                label="Biografie"
                ref={bio_ref}
                onChange={(s: string) => {
                  setBio(s);
                }}
                initialValue={user.bio}
              />
            </div>
          </div>
        </div>
      ),
    },
  };

  const [selectedTab, setSelectedTab] = useState(tabs.profile_settings.key);

  return (
    <ProtectedRoute>
      <AppLayout
        backTitle="Zurück"
        title="Profil"
        makeSwitch={makeSwitch}
        social={social}
        onBack={() => {
          router.push("/dashboard");
        }}
        subtitle="Einstellungen"
        content={
          <div className={styles.wrapper}>
            <div className={styles.sidebar}>
              <div className={styles.sidebar_top}>
                {Object.keys(tabs).map((tab: string, index) => (
                  <div
                    onClick={() => setSelectedTab(tab)}
                    key={index}
                    className={
                      styles.sidebar_item +
                      " " +
                      (selectedTab == tab ? styles.sidebar_item_selected : "")
                    }
                  >
                    {tabs[tab as keyof Tabs].title}
                  </div>
                ))}
              </div>
              <div className={styles.sidebar_bottom}>
                <div
                  onClick={() => logOut()}
                  className={
                    styles.sidebar_item + " " + styles.sidebar_item_red
                  }
                >
                  Ausloggen
                </div>
              </div>
            </div>
            <div className={styles.content_wrapper}>
              {tabs[selectedTab as keyof Tabs].content}
            </div>
          </div>
        }
      />
    </ProtectedRoute>
  );
};

export default ProfileSettings;
