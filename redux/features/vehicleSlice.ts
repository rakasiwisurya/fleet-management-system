import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_LIMIT,
  DEFAULT_TOTAL_DATA,
} from "@/assets/data/constants";
import { requestApi } from "@/libs/requestApi";
import { TResponseError } from "@/types/global";
import { TAsyncThunkPayload } from "@/types/redux";
import { TVehicle, TVehicles, TVehicleState } from "@/types/vehicle";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getVehicles = createAsyncThunk(
  "vehicle/getVehicles",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "get",
        endpoint: `/vehicles`,
        params: payload,
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
        params,
      });

      return response.data as TVehicle;
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
        const { data } = action.payload;

        state.vehicles = {
          ...state.vehicles,
          current_page: state.vehicles.current_page,
          has_next: !!action?.payload?.links?.next,
          has_prev: !!action?.payload?.links?.prev,
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
