import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_TOTAL_DATA,
} from "@/assets/data/constants";
import { requestApi } from "@/libs/requestApi";
import { TResponseError } from "@/types/global";
import { TAsyncThunkPayload } from "@/types/redux";
import {
  TRouteIncluded,
  TStopIncluded,
  TTripIncluded,
  TVehicle,
  TVehicles,
  TVehicleState,
} from "@/types/vehicle";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getVehicles = createAsyncThunk(
  "vehicle/getVehicles",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "get",
        endpoint: `/vehicles`,
        params: {
          ...payload,
          "fields[vehicle]":
            "label,current_status,latitude,longitude,updated_at",
        },
      });

      return response.data as TVehicles;
    } catch (error: TResponseError | any) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error?.error?.details[0] || error.message,
      );
    }
  },
);

export const getVehicle = createAsyncThunk(
  "vehicle/getVehicle",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    const { id, params } = payload;

    try {
      const response = await requestApi({
        method: "get",
        endpoint: `/vehicles/${id}`,
        params: {
          ...params,
          include: "route,trip,stop",
          "fields[route]": "long_name,short_name",
          "fields[trip]": "headsign,direction_id,block_id",
          "fields[stop]": "name,latitude,longitude",
        },
      });

      const vehicle = response.data.data as TVehicle["data"];
      const included = response.data.included as TVehicle["included"];
      const includedMap = Object.fromEntries(
        included?.map((i) => [i.type, i]) ?? [],
      );

      const { route, trip, stop } = includedMap as {
        route?: TRouteIncluded;
        trip?: TTripIncluded;
        stop?: TStopIncluded;
      };

      const vehicleData: TVehicle["data"] = {
        ...vehicle,
        relationships: {
          ...vehicle.relationships,

          route: {
            ...vehicle.relationships.route,
            data: {
              ...vehicle.relationships.route.data,
              long_name: route?.attributes.long_name,
              short_name: route?.attributes.short_name,
            },
          },

          trip: {
            ...vehicle.relationships.trip,
            data: {
              ...vehicle.relationships.trip.data,
              headsign: trip?.attributes.headsign,
              direction_id: trip?.attributes.direction_id,
              block_id: trip?.attributes.block_id,
            },
          },

          stop: {
            ...vehicle.relationships.stop,
            data: {
              ...vehicle.relationships.stop.data,
              name: stop?.attributes.name,
              latitude: stop?.attributes.latitude,
              longitude: stop?.attributes.longitude,
            },
          },
        },
      };

      delete response.data.included;

      return {
        ...response.data,
        data: vehicleData,
      } as TVehicle;
    } catch (error: TResponseError | any) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error?.error?.details[0] || error.message,
      );
    }
  },
);

const initialState: TVehicleState = {
  vehicles: {
    current_page: DEFAULT_CURRENT_PAGE,
    total_record: DEFAULT_TOTAL_DATA,
    has_next: false,
    has_prev: false,
    records: [],
  },
  isVehiclesLoading: true,
  vehiclesSuccess: null,
  vehiclesError: null,

  vehicle: null,
  isVehicleLoading: true,
  vehicleSuccess: null,
  vehicleError: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVehicle: (state, action) => {
      state.vehicle = action.payload;
    },
    resetVehicles: (state) => {
      state.vehicles = {
        current_page: DEFAULT_CURRENT_PAGE,
        total_record: DEFAULT_TOTAL_DATA,
        has_next: false,
        has_prev: false,
        records: [],
      };

      state.isVehiclesLoading = true;
      state.vehiclesSuccess = null;
      state.vehiclesError = null;
    },
    resetVehicle: (state) => {
      state.vehicle = null;

      state.isVehicleLoading = true;
      state.vehicleSuccess = null;
      state.vehicleError = null;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getVehicles.pending, (state) => {
        state.vehiclesSuccess = null;
        state.vehiclesError = null;
        state.isVehiclesLoading = true;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.vehiclesError = action.payload;
        state.isVehiclesLoading = false;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        const { data, links } = action.payload;

        const limit = Number(action.meta.arg["page[limit]"]);
        const offset = Number(action.meta.arg["page[offset]"]);

        const currentPage = offset / limit + 1;

        let total = 0;

        if (links?.last) {
          const url = new URL(links.last);
          const lastOffset = Number(url.searchParams.get("page[offset]") || 0);
          total = lastOffset + limit;
        }

        state.vehicles = {
          current_page: currentPage,
          total_record: total,
          has_next: !!links?.next,
          has_prev: !!links?.prev,
          records: data.map((item) => ({
            id: item.id,
            label: item.attributes.label,
            current_status: item.attributes.current_status,
            latitude: item.attributes.latitude,
            longitude: item.attributes.longitude,
            updated_at: item.attributes.updated_at,
          })),
        };

        state.vehiclesSuccess = "Success";
        state.isVehiclesLoading = false;
      })

      .addCase(getVehicle.pending, (state) => {
        state.vehicleSuccess = null;
        state.vehicleError = null;
        state.isVehicleLoading = true;
      })
      .addCase(getVehicle.rejected, (state, action) => {
        state.vehicleError = action.payload;
        state.isVehicleLoading = false;
      })
      .addCase(getVehicle.fulfilled, (state, action) => {
        state.vehicle = action.payload.data;
        state.vehicleSuccess = "Success";
        state.isVehicleLoading = false;
      });
  },
});

export const { setVehicle, resetVehicles, resetVehicle } = vehicleSlice.actions;
export const vehicleReducer = vehicleSlice.reducer;
