import payByPrime from "lib/fetch/tappay/pay-by-prime";
import payByToken from "lib/fetch/tappay/pay-by-token";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { body } = req;

    const { prime } = body.payload;

    const responsePayByPrime = await payByPrime({ prime });

    const payByPrimeData = responsePayByPrime.data;

    const {
      card_secret: { card_token: cardToken, card_key: cardKey }
    } = payByPrimeData;
    const responsePayByToken = await payByToken({ cardToken, cardKey });

    const payByTokenData = responsePayByToken.data;

    res.status(200).json({ reqBody: body, payByPrimeData, payByTokenData });
  }

  res.status(404).send();
};

export default handler;
