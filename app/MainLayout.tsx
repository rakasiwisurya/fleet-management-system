"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { webStorage } from "@/libs/webStorage";
import store from "@/redux/app/store";
import { setDark } from "@/redux/features/themeSlice";
import { ConfigProvider, theme } from "antd";
import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";

const { defaultAlgorithm, darkAlgorithm } = theme;

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const { dark } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const saved = webStorage.get("theme");

    if (saved) {
      const isDark = saved === "dark";
      dispatch(setDark(isDark));
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const systemDark = media.matches;

    dispatch(setDark(systemDark));
  }, [dispatch]);

  if (dark === null) return null;

  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? darkAlgorithm : defaultAlgorithm,
        token: {
          borderRadius: 10,
          colorPrimary: "#1f458f",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default MainLayout;
