import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useTranslation } from "next-i18next";

const Loading = ({ children, loading }) => {
  const { ready } = useTranslation();
  return loading || !ready ? (
    <div className="h-screen w-screen flex justify-center items-center fixed top-0 left-0 z-[9999] bg-[#fdf7f7]">
      <ProgressSpinner />
    </div>
  ) : (
    children
  );
};

export default Loading;
