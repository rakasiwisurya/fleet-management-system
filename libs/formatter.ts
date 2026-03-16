import { TCurrentStatus, TOccupancyStatus } from "@/types/vehicle";
import dayjs from "dayjs";

export const formatCapitalize = (value: string | null) => {
  if (!value) return value;

  const words = value.toLowerCase().split(" ");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
};

export const formatNumber = (value?: any) => {
  if (value) return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value;
};

export const parseNumber = (value?: any) => {
  if (value) return value.replace(/,/g, "") as unknown as number;
  return value;
};

export const formatToCurrency = (value: number | string): string => {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) return "Not a Number";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export const formatVehicleStatus = (status: TCurrentStatus) => {
  const formattedStatus = status.replaceAll("_", " ");

  switch (status) {
    case "IN_TRANSIT_TO":
      return {
        color: "green",
        label: formattedStatus,
      };

    case "INCOMING_AT":
      return {
        color: "gold",
        label: formattedStatus,
      };

    case "STOPPED_AT":
      return {
        color: "red",
        label: formattedStatus,
      };

    default:
      return {
        color: "blue",
        label: formattedStatus,
      };
  }
};

export const formatVehicleOccupancy = (status: TOccupancyStatus) => {
  switch (status) {
    case "EMPTY":
      return { label: "Empty", color: "green" };

    case "MANY_SEATS_AVAILABLE":
      return { label: "Many Seats Available", color: "green" };

    case "FEW_SEATS_AVAILABLE":
      return { label: "Few Seats Available", color: "orange" };

    case "FULL":
      return { label: "Full", color: "red" };

    default:
      return { label: status, color: "blue" };
  }
};

export const formatDateTime = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY HH:mm:ss");
};
