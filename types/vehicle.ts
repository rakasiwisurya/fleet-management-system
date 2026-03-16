import { TResponseList } from "./global";

export type TRevenueStatus = "REVENUE" | "NON_REVENUE";

export type TOccupancyStatus =
  | "EMPTY"
  | "FEW_SEATS_AVAILABLE"
  | "MANY_SEATS_AVAILABLE"
  | "STANDING_ROOM_ONLY"
  | "CRUSHED_STANDING_ROOM_ONLY"
  | "FULL"
  | "NOT_ACCEPTING_PASSENGERS";

export type TCurrentStatus = "INCOMING_AT" | "IN_TRANSIT_TO" | "STOPPED_AT";

export type TVehicles = {
  links: {
    self: string;
    prev: string;
    next: string;
    last: string;
    first: string;
  };
  data: {
    type: string;
    relationships: {
      trip: {
        links: {
          self: string;
          related: string;
        };
        data: {
          type: string;
          id: string;
        };
      };
      stop: {
        links: {
          self: string;
          related: string;
        };
        data: {
          type: string;
          id: string;
        };
      };
      route: {
        links: {
          self: string;
          related: string;
        };
        data: {
          type: string;
          id: string;
        };
      };
    };
    links: {};
    id: string;
    attributes: {
      updated_at: string;
      speed: number;
      revenue_status: TRevenueStatus;
      occupancy_status: TOccupancyStatus;
      longitude: number;
      latitude: number;
      label: string;
      direction_id: number;
      current_stop_sequence: number;
      current_status: TCurrentStatus;
      carriages: {
        occupancy_status: TOccupancyStatus;
        occupancy_percentage: number;
        label: string;
      }[];
      bearing: number;
    };
  }[];
};

export type TVehicle = {
  links: {
    self: string;
  };
  included: {
    type: string;
    id: string;
  }[];
  data: {
    type: string;
    relationships: {
      trip: {
        links: {
          self: string;
          related: string;
        };
        data: {
          type: string;
          id: string;
        };
      };
      stop: {
        links: {
          self: string;
          related: string;
        };
        data: {
          type: string;
          id: string;
        };
      };
      route: {
        links: {
          self: string;
          related: string;
        };
        data: {
          type: string;
          id: string;
        };
      };
    };
    links: {};
    id: string;
    attributes: {
      updated_at: string;
      speed: number;
      revenue_status: TRevenueStatus;
      occupancy_status: TOccupancyStatus;
      longitude: number;
      latitude: number;
      label: string;
      direction_id: number;
      current_stop_sequence: number;
      current_status: TCurrentStatus;
      carriages: {
        occupancy_status: TOccupancyStatus;
        occupancy_percentage: number;
        label: string;
      }[];
      bearing: number;
    };
  };
};

export type TVehicleRecords = {
  id: string;
  label: string;
  current_status: TCurrentStatus;
  latitude: number;
  longitude: number;
  updated_at: string;
};

export type TVehicleState = {
  vehicles: TResponseList<TVehicleRecords>;
  isVehiclesLoading: boolean;
  vehiclesSuccess: any;
  vehiclesError: any;

  vehicle: TVehicle["data"] | null;
  isVehicleLoading: boolean;
  vehicleSuccess: any;
  vehicleError: any;
};
