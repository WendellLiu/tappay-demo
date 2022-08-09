import { tappayClient } from "lib/fetch";

const tappayRestEndpoint = process.env.TAPPAY_REST_ENDPOINT;
const partnerKey = process.env.TAPPAY_PARTNER_KEY;

const url = `${tappayRestEndpoint}/tpc/payment/pay-by-prime`;

const payByPrime = ({ prime }) =>
  tappayClient.post(url, {
    prime,
    partner_key: partnerKey,
    merchant_id: "goodjob20160501_CTBC",
    details: "GoodJob Tappay Test",
    amount: 1,
    cardholder: {
      phone_number: "",
      name: "",
      email: "test@Wang.com",
      zip_code: "",
      address: "",
      national_id: ""
    },
    remember: true
  });

export default payByPrime;
