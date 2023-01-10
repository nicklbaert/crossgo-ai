import React, { createContext, useContext, useEffect, useState } from "react";

import { Popup } from "../components/popup/popup";

export type Popup = {
  title: string;
  subtitle: string;
  content: any;
  onSave: any;
  onCancel: any;
};

const PopupContext = createContext({});

export const usePopup = () => useContext<any>(PopupContext);

export const PopupContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [popup, setPopup] = useState<Popup | null>(null);

  const isPopupOpen = () => {
    return popup != null;
  };

  const openPopup = (popup: Popup) => {
    setPopup(popup);
  };

  const closePopup = () => {
    setPopup(null);
  };

  return (
    <PopupContext.Provider value={{ openPopup, isPopupOpen, closePopup }}>
      {children}
      {popup && (
        <Popup
          id="popup"
          isOpen={true}
          onClose={() => {
            closePopup();
          }}
          title={popup.title}
          subtitle={popup.subtitle}
          content={popup.content}
        />
      )}
    </PopupContext.Provider>
  );
};
