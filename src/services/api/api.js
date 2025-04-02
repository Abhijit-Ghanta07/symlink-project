import axios from "axios";
// hide it on env
const baseUrl = "https://api.orgchrat.iosx.in/api/v1/user";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiT1JHIiwiZW1haWwiOiJhZG1pbmlzdHJhdG9yQG9yZy5jb20iLCJpYXQiOjE3NDM1OTU5MzMsImV4cCI6MTc0NDIwMDczM30.0Z-OX4S6knxjWFb5TKCc5t6ysM8gMZMzSUBCWznJBlk";

export const axiosInt = axios.create({
  baseURL: baseUrl,
  headers: {
    token: token,
  },
});
