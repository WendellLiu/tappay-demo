import React, { createContext, useState } from "react";

export const TappayContext = createContext({});

export const TappayProvider = props => {
  const [tappaySDKLoad, setTappySDKLoad] = useState(false);

  return (
    <TappayContext.Provider
      value={{
        tappaySDKLoad,
        setTappySDKLoad
      }}
    >
      {props.children}
    </TappayContext.Provider>
  );
};
