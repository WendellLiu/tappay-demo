import axios from "axios";

export const apiClient = axios.create();

export const tappayClient = axios.create();

const partnerKey = process.env.TAPPAY_PARTNER_KEY;

tappayClient.interceptors.request.use(config => {
  config.headers["x-api-key"] = partnerKey;
  return config;
});
