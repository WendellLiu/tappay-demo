import { useCallback } from "react";
import Head from "next/head";
import { Box, Button, Text } from "@chakra-ui/react";

import useDirectCard from "lib/hooks/use-direct-card";

const getBorderColor = state => {
  switch (state) {
    case "valid":
      return "green.500";
    case "invalid":
      return "red.500";
    case "normal":
    default:
      return "gray.200";
  }
};

const FieldContainer = ({ state, ...props }) => {
  const borderColor = getBorderColor(state);

  return (
    <Box
      h={8}
      w="30em"
      border="1px"
      borderColor={borderColor}
      px="2"
      py="2"
      {...props}
    />
  );
};
export default function Home() {
  const { cardNumberState, cardExpiryState, ccvState } = useDirectCard();

  const onSubmit = useCallback(e => {
    e.preventDefault();

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
      alert("can not get prime");
      return;
    }

    // Get prime
    TPDirect.card.getPrime(result => {
      if (result.status !== 0) {
        alert("get prime error " + result.msg);
        return;
      }
      alert("get prime 成功，prime: " + result.card.prime);
    });
  }, []);

  return (
    <Box py="4" px="12">
      <Head>
        <title>Tappay Demo</title>
      </Head>

      <form onSubmit={onSubmit}>
        <Box mb={4}>
          <label htmlFor="card-number">
            <Text>卡號</Text>
            <FieldContainer
              state={cardNumberState}
              id="card-number"
            ></FieldContainer>
          </label>
        </Box>
        <Box mb={4}>
          <label>
            <Text>到期日</Text>
            <FieldContainer
              state={cardExpiryState}
              id="card-expiration-date"
            ></FieldContainer>
          </label>
        </Box>
        <Box mb={4}>
          <label>
            <Text>後三碼</Text>
            <FieldContainer state={ccvState} id="card-ccv"></FieldContainer>
          </label>
        </Box>

        <Button type="submit" colorScheme="teal" variant="outline">
          Submit
        </Button>
      </form>
    </Box>
  );
}
