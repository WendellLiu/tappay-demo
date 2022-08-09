import { useEffect, useContext, useState } from "react";

import { TappayContext } from "lib/contexts/tappay";

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
  input: {
    color: "gray"
  },
  "input.ccv": {
    // 'font-size': '16px'
  },
  ":focus": {
    color: "black"
  },
  ".valid": {
    color: "green"
  },
  ".invalid": {
    color: "red"
  },
  "@media screen and (max-width: 400px)": {
    input: {
      color: "orange"
    }
  }
};

const log = (...value) => console.log("useDirectCard", ...value);

const useDirectCard = () => {
  const { tappaySDKLoad } = useContext(TappayContext);
  const [directCardSetup, setDirectCardSetup] = useState(false);
  const [cardNumberState, setCardNumberState] = useState("normal");
  const [cardExpiryState, setCardExpiryState] = useState("normal");
  const [ccvState, setCcvState] = useState("normal");

  useEffect(() => {
    if (!directCardSetup && tappaySDKLoad) {
      console.log("setup card");
      TPDirect.card.setup({
        fields,
        styles
      });

      setDirectCardSetup(true);
    }
  }, [directCardSetup, tappaySDKLoad]);

  useEffect(() => {
    if (tappaySDKLoad) {
      TPDirect.card.onUpdate(function (update) {
        if (update.canGetPrime) {
          log("can get prime");
        } else {
          log("cannot get prime");
        }

        // card type
        const newType = update.cardType === "unknown" ? "" : update.cardType;

        log("card type", newType);

        // status handling
        if (update.status.number === 2) {
          setCardNumberState("invalid");
        }

        if (update.status.number === 1) {
          setCardNumberState("normal");
        }

        if (update.status.number === 0) {
          setCardNumberState("valid");
        }

        if (update.status.expiry === 2) {
          setCardExpiryState("invalid");
        }

        if (update.status.expiry === 1) {
          setCardExpiryState("normal");
        }

        if (update.status.expiry === 0) {
          setCardExpiryState("valid");
        }

        if (update.status.ccv === 2) {
          setCcvState("invalid");
        }

        if (update.status.ccv === 1) {
          setCcvState("normal");
        }

        if (update.status.ccv === 0) {
          setCcvState("valid");
        }
      });
    }
  }, [tappaySDKLoad]);

  return { cardNumberState, cardExpiryState, ccvState };
};

export default useDirectCard;
