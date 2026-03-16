import { ArgsProps } from "antd/es/notification";

export type TNotificationStatus = "success" | "info" | "warning" | "error";
export type TNotificationConfigMessage = { message?: string };
export type TNotificationConfig = Omit<ArgsProps, "message"> &
  TNotificationConfigMessage;
