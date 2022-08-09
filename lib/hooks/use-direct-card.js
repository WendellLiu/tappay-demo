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

const useDirectCard = () => {
  const { tappaySDKLoad } = useContext(TappayContext);
  const [directCardSetup, setDirectCardSetup] = useState(false);

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
};

export default useDirectCard;
