import { tappayClient } from "lib/fetch";

const tappayRestEndpoint = process.env.TAPPAY_REST_ENDPOINT;
const partnerKey = process.env.TAPPAY_PARTNER_KEY;

const url = `${tappayRestEndpoint}/tpc/payment/pay-by-token`;

const payByToken = ({ cardKey, cardToken }) =>
  tappayClient.post(url, {
    partner_key: partnerKey,
    merchant_id: "goodjob20160501_CTBC",
    details: "GoodJob Tappay pay-by-token Test",
    card_key: cardKey,
    card_token: cardToken,
    currency: "TWD",
    amount: 200
  });

export default payByToken;
