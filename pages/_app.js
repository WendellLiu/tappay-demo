import { useContext } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Script from "next/script";

import { TappayProvider, TappayContext } from "lib/contexts/tappay";

import "../styles/globals.css";

const TappayScript = () => {
  const TAP_PAY_APP_ID = process.env.NEXT_PUBLIC_TAP_PAY_APP_ID;
  const TAP_PAY_APP_KEY = process.env.NEXT_PUBLIC_TAP_PAY_APP_KEY;

  const { setTappySDKLoad } = useContext(TappayContext);

  return (
    <Script
      src={`https://js.tappaysdk.com/tpdirect/v5.12.3`}
      strategy="lazyOnload"
      onLoad={() => {
        TPDirect.setupSDK(TAP_PAY_APP_ID, TAP_PAY_APP_KEY, "sandbox");
        setTappySDKLoad(true);
      }}
    />
  );
};

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <TappayProvider>
        <TappayScript />
        <Component {...pageProps} />
      </TappayProvider>
    </ChakraProvider>
  );
}

export default App;
