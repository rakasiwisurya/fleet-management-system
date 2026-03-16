import { requestApi } from "@/libs/requestApi";
import { TListState } from "@/types/list";
import { TAsyncThunkPayload } from "@/types/redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRoutes = createAsyncThunk(
  "list/getRoutes",
  async (_, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "get",
        endpoint: `/routes`,
        params: {
          sort: "short_name",
          "filter[type]": 3,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error?.error?.details[0] || error.message,
      );
    }
  },
);

export const getTrips = createAsyncThunk(
  "list/getTrips",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    const { route_ids } = payload;

    try {
      const response = await requestApi({
        method: "get",
        endpoint: `/trips`,
        params: {
          sort: "direction_id",
          "filter[route]": route_ids,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error?.error?.details[0] || error.message,
      );
    }
  },
);

const initialState: TListState = {
  routes: [],
  isRoutesLoading: false,
  routesSuccess: null,
  routesError: null,

  trips: [],
  isTripsLoading: false,
  tripsSuccess: null,
  tripsError: null,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    resetRoutes: (state) => {
      state.routes = [];

      state.isRoutesLoading = false;
      state.routesSuccess = null;
      state.routesError = null;
    },
    resetTrips: (state) => {
      state.trips = [];

      state.isTripsLoading = false;
      state.tripsSuccess = null;
      state.tripsError = null;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getRoutes.pending, (state) => {
        state.routesSuccess = null;
        state.routesError = null;
        state.isRoutesLoading = true;
      })
      .addCase(getRoutes.rejected, (state, action) => {
        state.routesError = action.payload;
        state.isRoutesLoading = false;
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        const { data } = action.payload;

        state.routes = data.map((item: any) => ({
          value: item.id,
          label: `${item.attributes.short_name} - ${item.attributes.long_name}`,
        }));

        state.routesSuccess = "Success";
        state.isRoutesLoading = false;
      })

      .addCase(getTrips.pending, (state) => {
        state.tripsSuccess = null;
        state.tripsError = null;
        state.isTripsLoading = true;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.tripsError = action.payload;
        state.isTripsLoading = false;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        const { data } = action.payload;

        state.trips = data.map((item: any) => ({
          value: item.id,
          label: `${item.attributes.headsign} (${item.attributes.direction_id === 1 ? "Inbound" : "Outbound"}) - ${item.attributes.block_id}`,
        }));

        state.tripsSuccess = "Success";
        state.isTripsLoading = false;
      });
  },
});

export const { resetRoutes, resetTrips } = listSlice.actions;
export const listReducer = listSlice.reducer;
