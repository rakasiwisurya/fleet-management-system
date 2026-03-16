import { SelectProps } from "antd";

export type TListState = {
  routes: SelectProps["options"];
  isRoutesLoading: boolean;
  routesSuccess: any;
  routesError: any;

  trips: SelectProps["options"];
  isTripsLoading: boolean;
  tripsSuccess: any;
  tripsError: any;
};
