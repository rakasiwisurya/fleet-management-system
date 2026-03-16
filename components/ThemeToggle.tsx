import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleTheme } from "@/redux/features/themeSlice";
import { Button } from "antd";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const dispatch = useAppDispatch();

  const { dark } = useAppSelector((state) => state.theme);

  return (
    <Button
      shape="circle"
      size="large"
      onClick={() => dispatch(toggleTheme())}
      icon={dark ? <FiSun /> : <FiMoon />}
    />
  );
}
