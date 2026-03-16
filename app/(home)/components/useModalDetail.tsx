import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { formatVehicleStatus } from "@/libs/formatter";
import {
  getVehicle,
  resetVehicle,
  setVehicle,
} from "@/redux/features/vehicleSlice";
import { TUseModalDetail } from "@/types/global";
import { divIcon } from "leaflet";
import { useEffect, useMemo } from "react";
import { renderToString } from "react-dom/server";
import { FaBus } from "react-icons/fa";

const useModalDetail = ({ id, isModalOpen }: TUseModalDetail) => {
  const dispatch = useAppDispatch();

  const { isVehicleLoading, vehicle } = useAppSelector(
    (state) => state.vehicle,
  );

  const data = useMemo(() => vehicle?.attributes, [vehicle]);
  const busIcon = useMemo(
    () =>
      divIcon({
        html: renderToString(
          <FaBus
            size={28}
            color={
              data ? formatVehicleStatus(data.current_status).color : "#1677ff"
            }
            style={
              data
                ? {
                    transform: `rotate(${data.bearing}deg)`,
                  }
                : undefined
            }
          />,
        ),
        className: "bus-marker",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    [data],
  );

  useEffect(() => {
    return () => {
      dispatch(resetVehicle());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isModalOpen) dispatch(setVehicle(null));
  }, [isModalOpen, dispatch]);

  useEffect(() => {
    if (id) dispatch(getVehicle({ id }));
  }, [id, dispatch]);

  return { isVehicleLoading, vehicle, data, busIcon };
};

export default useModalDetail;
