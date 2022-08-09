import { apiClient } from "lib/fetch";

const url = "/api/subscriptions";

export const postSubscriptions = (paymentType, payload) =>
  apiClient.post(url, {
    paymentType,
    payload
  });
