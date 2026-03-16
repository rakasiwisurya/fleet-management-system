import Loading from "@/components/Loading";
import {
  formatDateTime,
  formatVehicleOccupancy,
  formatVehicleStatus,
} from "@/libs/formatter";
import { TUseModalDetail } from "@/types/global";
import { Card, Col, Modal, Row, Tag, Typography } from "antd";
import { FaBus, FaUserFriends } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { MdAltRoute, MdLocationPin, MdSpeed } from "react-icons/md";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useModalDetail from "./useModalDetail";

const { Title, Text } = Typography;

const ModalDetail = ({ id, isModalOpen, onCancel }: TUseModalDetail) => {
  const { isVehicleLoading, vehicle, data, busIcon } = useModalDetail({
    id,
    isModalOpen,
  });

  if (isVehicleLoading || !vehicle || !data) {
    return (
      <Modal
        title="Detail Vehicle"
        open={isModalOpen}
        onCancel={onCancel}
        closable
        centered
        footer={null}
      >
        <Loading />
      </Modal>
    );
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <FaBus />
          <span>{data.label}</span>
        </div>
      }
      open={isModalOpen}
      onCancel={onCancel}
      centered
      width={950}
      footer={null}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Title level={5}>Vehicle Info</Title>

            <Tag color={formatVehicleStatus(data.current_status).color}>
              {data.current_status.replaceAll("_", " ")}
            </Tag>

            <div className="flex items-center gap-2 mt-3">
              <MdSpeed />
              <Text>
                Speed: {data.speed ?? "N/A"} {data.speed ? "km/h" : ""}
              </Text>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <MdLocationPin />
              <Text>
                {data.latitude}, {data.longitude}
              </Text>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <LuClock />
              <Text>Updated: {formatDateTime(data.updated_at)}</Text>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <MdAltRoute className="opacity-70" />
              <Text>{data.direction_id === 1 ? "Inbound" : "Outbound"}</Text>
            </div>

            {data.occupancy_status && (
              <div className="flex items-center gap-2 mt-3">
                <FaUserFriends className="opacity-70" />
                <Tag
                  color={formatVehicleOccupancy(data.occupancy_status).color}
                >
                  {formatVehicleOccupancy(data.occupancy_status).label}
                </Tag>
              </div>
            )}
          </Card>
        </Col>

        {/* ROUTE INFO */}
        <Col xs={24} md={8}>
          <Card title="Route Information">
            <Text strong>Route ID</Text>
            <div>{vehicle.relationships.route.data.id}</div>

            <Text strong className="mt-2 block">
              Trip ID
            </Text>
            <div>{vehicle.relationships.trip.data.id}</div>

            <Text strong className="mt-2 block">
              Stop ID
            </Text>
            <div>{vehicle.relationships.stop.data.id}</div>
          </Card>
        </Col>

        {/* OCCUPANCY */}
        <Col xs={24} md={8}>
          <Card title="Occupancy">
            {data.carriages.length === 0 ? (
              <Text type="secondary">No carriage data available</Text>
            ) : (
              data.carriages.map((c, i) => (
                <div key={i} className="mb-2">
                  <Text>
                    {c.label} - {c.occupancy_percentage}%
                  </Text>

                  <div className="w-full bg-gray-200 rounded h-2 mt-1">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${c.occupancy_percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </Card>
        </Col>

        {/* MAP */}
        <Col xs={24}>
          <Card title="Live Location">
            {data.latitude && data.longitude && (
              <MapContainer
                center={[data.latitude, data.longitude]}
                zoom={15}
                style={{ height: 250, width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                  position={[data.latitude, data.longitude]}
                  icon={busIcon}
                >
                  <Popup>
                    {data.label} <br /> Speed: {data.speed} km/h
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalDetail;
