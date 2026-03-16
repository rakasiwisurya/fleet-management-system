"use client";

import { DEFAULT_LIMIT, DEFAULT_PAGE_SIZE } from "@/assets/data/constants";
import ThemeToggle from "@/components/ThemeToggle";
import { formatDateTime, formatVehicleStatus } from "@/libs/formatter";
import {
  Button,
  Card,
  Col,
  Empty,
  Form,
  Pagination,
  Row,
  Select,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import { FaBus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { MdLocationPin, MdRefresh } from "react-icons/md";
import ModalDetail from "./components/ModalDetail";
import useHome from "./useHome";

const { Title, Text } = Typography;

export default function Home() {
  const {
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
  } = useHome();

  return (
    <section>
      <main
        className={`min-h-screen flex flex-col items-center py-24 gap-10 px-6 ${dark ? "bg-neutral-900" : "bg-white"}`}
      >
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <Title className="text-center font-semibold!">
          Fleet Management System
        </Title>

        <Form
          id="filterForm"
          layout="vertical"
          requiredMark={false}
          className="w-full max-w-6xl mb-5"
          form={form}
          onFinish={onFilter}
        >
          <Form.Item name="routes" label="Routes">
            <Select
              mode="multiple"
              placeholder="Select an route"
              className="w-full"
              loading={isRoutesLoading}
              options={listRoutes}
              virtual
              showSearch
              allowClear
            />
          </Form.Item>

          <Form.Item name="trips" label="Trips">
            <Select
              mode="multiple"
              placeholder="Select an trip"
              className="w-full"
              loading={isTripsLoading}
              options={listTrips}
              showSearch
              allowClear
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<FaMagnifyingGlass />}
              disabled={isRoutesLoading || isTripsLoading}
              loading={isFilterLoading}
              block
            >
              Filter
            </Button>
          </Form.Item>
        </Form>

        <div className="max-w-6xl w-full">
          <Button
            icon={<MdRefresh />}
            onClick={() => setIsGetData(true)}
            loading={isVehiclesLoading}
          >
            Refresh
          </Button>
        </div>

        <Row gutter={[24, 24]} className="max-w-6xl w-full">
          {isVehiclesLoading &&
            Array.from({ length: DEFAULT_LIMIT }).map((_, i) => (
              <Col key={i} xs={24} md={8}>
                <Card>
                  <Skeleton />
                </Card>
              </Col>
            ))}

          {!isVehiclesLoading && vehicles.length === 0 && (
            <Col span={24} className="text-center">
              <Empty description="No vehicles found" />
            </Col>
          )}

          {!isVehiclesLoading &&
            vehicles.map((vehicle, index) => {
              const statusInfo = formatVehicleStatus(vehicle.current_status);

              return (
                <Col key={index} xs={24} md={8}>
                  <Card
                    className="text-center shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => onModalDetail(vehicle.id)}
                    cover={
                      <div className="h-40">
                        <div className="h-full flex items-center justify-center">
                          <FaBus
                            size={70}
                            className="opacity-60 inline-block"
                            color={statusInfo.color}
                          />
                        </div>
                      </div>
                    }
                  >
                    <Title
                      level={4}
                      className="mb-1! flex justify-center gap-2 items-center"
                    >
                      <FaBus className="opacity-70" />
                      {vehicle.label}
                    </Title>

                    <Tag color={statusInfo.color}>{statusInfo.label}</Tag>

                    <div className="flex flex-col gap-2 mt-4 text-sm">
                      <div className="flex items-center justify-center gap-2 opacity-80">
                        <MdLocationPin />
                        <Text>
                          {vehicle.latitude}, {vehicle.longitude}
                        </Text>
                      </div>

                      <div className="flex items-center justify-center gap-2 opacity-70">
                        <LuClock />
                        <Text>{formatDateTime(vehicle.updated_at)}</Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
        </Row>

        <Pagination
          size="medium"
          current={currentPage}
          total={totalData}
          pageSize={limit}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          onChange={(page) => {
            setIsGetData(true);
            setCurrentPage(page);
          }}
          onShowSizeChange={(current, size) => {
            setIsGetData(true);
            setCurrentPage(current);
            setLimit(size);
          }}
          pageSizeOptions={DEFAULT_PAGE_SIZE}
          showSizeChanger
          responsive
        />
      </main>

      <ModalDetail
        isModalOpen={isModalDetailOpen}
        onCancel={onCancelDetail}
        id={detailId}
      />
    </section>
  );
}
