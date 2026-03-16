import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_LIMIT,
  DEFAULT_TOTAL_DATA,
} from "@/assets/data/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getRoutes,
  getTrips,
  resetRoutes,
  resetTrips,
} from "@/redux/features/listSlice";
import { getVehicles, resetVehicles } from "@/redux/features/vehicleSlice";
import { Form } from "antd";
import { useCallback, useEffect, useState } from "react";

const { useForm, useWatch } = Form;

const useHome = () => {
  const [form] = useForm();

  const routes = useWatch("routes", form);
  const trips = useWatch("trips", form);

  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isGetData, setIsGetData] = useState(true);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [totalData, setTotalData] = useState(DEFAULT_TOTAL_DATA);
  const [detailId, setDetailId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const { dark } = useAppSelector((state) => state.theme);
  const {
    isRoutesLoading,
    isTripsLoading,
    routes: listRoutes,
    trips: listTrips,
  } = useAppSelector((state) => state.list);
  const {
    vehicles: { current_page, total_record, records: vehicles },
    isVehiclesLoading,
    vehiclesSuccess,
  } = useAppSelector((state) => state.vehicle);

  const getData = useCallback(async () => {
    const payload = {
      sort: "-updated_at",
      "page[offset]": (currentPage - 1) * limit,
      "page[limit]": limit,
      ...(routes?.length > 0 ? { "filter[route]": routes?.join(",") } : {}),
      ...(trips?.length > 0 ? { "filter[trip]": trips?.join(",") } : {}),
    };

    dispatch(getVehicles(payload));
  }, [limit, currentPage, trips, routes, dispatch]);

  const onModalDetail = (id: string) => {
    setDetailId(id);
    setIsModalDetailOpen(true);
  };

  const onCancelDetail = () => {
    setIsModalDetailOpen(false);
    setDetailId(null);
  };

  const onFilter = useCallback(() => {
    setIsFilterLoading(true);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
    setIsGetData(true);
  }, []);

  useEffect(() => {
    if (routes?.length > 0) {
      dispatch(getTrips({ route_ids: routes.join(",") }));
    }

    return () => {
      dispatch(resetTrips());
    };
  }, [dispatch, routes]);

  useEffect(() => {
    dispatch(getRoutes());

    return () => {
      dispatch(resetVehicles());
      dispatch(resetRoutes());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isGetData) {
      getData();
      setIsGetData(false);
    }
  }, [currentPage, limit, isGetData, getData]);

  useEffect(() => {
    if (vehiclesSuccess) {
      setCurrentPage(current_page);
      setTotalData(total_record);
      setIsFilterLoading(false);
    }
  }, [vehiclesSuccess, current_page, total_record]);

  return {
    form,
    dark,
    currentPage,
    vehicles,
    detailId,
    isFilterLoading,
    isVehiclesLoading,
    isModalDetailOpen,
    isRoutesLoading,
    isTripsLoading,
    listRoutes,
    listTrips,
    limit,
    totalData,
    onModalDetail,
    onCancelDetail,
    setCurrentPage,
    setIsGetData,
    setLimit,
    onFilter,
  };
};

export default useHome;
