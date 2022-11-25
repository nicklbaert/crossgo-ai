import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { authFetchJSON } from "../lib/apiHelper";
import { AuthContextProvider } from "../context/authUserContext";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  let [social, setSocial] = useState(false);

  function makeSwitch() {
    setSocial(!social);
  }

  return (
    <AuthContextProvider>
      <Component {...pageProps} makeSwitch={makeSwitch} social={social} />
    </AuthContextProvider>
  );
}

export default MyApp;
