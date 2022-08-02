import { useEffect } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

const FieldContainer = props => <Box h={6} w={24} {...props} />;

export default function Home() {
  useEffect(() => {}, []);

  return (
    <Box>
      <Head>
        <title>Tappay Demo</title>
      </Head>

      <FieldContainer id="card-number"></FieldContainer>
      <FieldContainer id="card-expiration-date"></FieldContainer>
      <FieldContainer id="card-ccv"></FieldContainer>
    </Box>
  );
}
