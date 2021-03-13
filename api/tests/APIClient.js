import got from "got";
import dotenv from "dotenv";

dotenv.config();

export const request = got.extend({
  prefixUrl: process.env.API_URL,
  responseType: "json",
  retry: 0
});