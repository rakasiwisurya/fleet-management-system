import { TResponseList } from "./global";

export type TRevenueStatus = "REVENUE" | "NON_REVENUE";

export type TOccupancyStatus =
  | "EMPTY"
  | "FEW_SEATS_AVAILABLE"
  | "MANY_SEATS_AVAILABLE"
  | "STANDING_ROOM_ONLY"
  | "CRUSHED_STANDING_ROOM_ONLY"
  | "FULL"
  | "NOT_ACCEPTING_PASSENGERS"
  | "NO_DATA_AVAILABLE"
  | "NOT_BOARDABLE";

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

export type TRouteIncluded = {
  type: "route";
  id: string;
  attributes: {
    long_name: string;
    short_name: string;
  };
};

export type TTripIncluded = {
  type: "trip";
  id: string;
  attributes: {
    headsign: string;
    direction_id: number;
    block_id: string;
  };
};

export type TStopIncluded = {
  type: "stop";
  id: string;
  attributes: {
    name: string;
    latitude: number;
    longitude: number;
  };
};

export type TVehicleIncluded = TRouteIncluded | TTripIncluded | TStopIncluded;

export type TVehicleRelationships = {
  route: {
    data: {
      type: "route";
      id: string;
      long_name?: string;
      short_name?: string;
    };
  };

  trip: {
    data: {
      type: "trip";
      id: string;
      headsign?: string;
      direction_id?: number;
      block_id?: string;
    };
  };

  stop: {
    data: {
      type: "stop";
      id: string;
      name?: string;
      latitude?: number;
      longitude?: number;
    };
  };
};

export type TVehicleAttributes = {
  updated_at: string;
  speed: number | null;
  revenue_status: TRevenueStatus;
  occupancy_status: TOccupancyStatus;
  longitude: number;
  latitude: number;
  label: string;
  direction_id: number;
  current_stop_sequence: number;
  current_status: TCurrentStatus;
  bearing: number;

  carriages: {
    occupancy_status: TOccupancyStatus;
    occupancy_percentage: number;
    label: string;
  }[];
};

export type TVehicle = {
  links: {
    self: string;
  };

  data: {
    type: "vehicle";
    id: string;

    attributes: TVehicleAttributes;
    relationships: TVehicleRelationships;
  };

  included?: TVehicleIncluded[];
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
