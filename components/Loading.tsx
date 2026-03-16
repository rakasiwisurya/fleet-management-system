import { Flex, Spin } from "antd";

const Loading = () => {
  return (
    <Flex justify="center" align="center" className="w-full h-full">
      <Spin />
    </Flex>
  );
};

export default Loading;
