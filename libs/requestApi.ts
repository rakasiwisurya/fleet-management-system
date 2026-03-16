import { TRequestApi } from "@/types/requestApi";
import axios from "axios";
import { notif } from "./notification";

const queryParams = (data: any) => {
  return `?${Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join("&")}`;
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export const requestApi = async ({
  contentType = "json", //json or formData
  method, //get or post or put or delete or others http method
  endpoint,
  body,
  params,
}: TRequestApi) => {
  try {
    const newParams = params ? queryParams(params) : "";
    const response = await instance.request({
      url: `${endpoint}${newParams}`,
      method,
      data: body,
      headers: {
        "Content-Type":
          contentType === "json" ? "application/json" : "multipart/form-data",
        accept: "application/vnd.api+json",
      },
    });
    return response;
  } catch (error: any) {
    console.error(error);
    notif.error({
      description: error?.response?.data?.message || error.message,
    });
    throw new Error(error);
  }
};
