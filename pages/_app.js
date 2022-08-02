import { ChakraProvider } from "@chakra-ui/react";
import Script from "next/script";

const fields = {
  number: {
    // css selector
    element: "#card-number",
    placeholder: "**** **** **** ****"
  },
  expirationDate: {
    element: "#card-expiration-date",
    placeholder: "MM / YY"
  },
  ccv: {
    element: "#card-ccv",
    placeholder: "ccv"
  }
};

const styles = {
  // Style all elements
  input: {
    color: "gray"
  },
  // Styling ccv field
  "input.ccv": {
    // 'font-size': '16px'
  },
  // Styling expiration-date field
  "input.expiration-date": {
    // 'font-size': '16px'
  },
  // Styling card-number field
  "input.card-number": {
    // 'font-size': '16px'
  },
  // style focus state
  ":focus": {
    // 'color': 'black'
  },
  // style valid state
  ".valid": {
    color: "green"
  },
  // style invalid state
  ".invalid": {
    color: "red"
  },
  // Media queries
  // Note that these apply to the iframe, not the root window.
  "@media screen and (max-width: 400px)": {
    input: {
      color: "orange"
    }
  }
};

function MyApp({ Component, pageProps }) {
  const TAP_PAY_APP_ID = process.env.NEXT_PUBLIC_TAP_PAY_APP_ID;
  const TAP_PAY_APP_KEY = process.env.NEXT_PUBLIC_TAP_PAY_APP_KEY;

  return (
    <ChakraProvider>
      <Script
        src={`https://js.tappaysdk.com/tpdirect/v5.12.3`}
        strategy="lazyOnload"
        onLoad={() => {
          TPDirect.setupSDK(TAP_PAY_APP_ID, TAP_PAY_APP_KEY, "sandbox");
          TPDirect.card.setup({
            fields,
            styles
          });
        }}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
