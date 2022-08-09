import payByPrime from "lib/fetch/tappay/pay-by-prime";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { body } = req;

    const { prime } = body.payload;

    const responseFromTappay = await payByPrime({ prime });

    const data = responseFromTappay.data;

    res.status(200).json({ reqBody: body, data });
  }

  res.status(404).send();
};

export default handler;
