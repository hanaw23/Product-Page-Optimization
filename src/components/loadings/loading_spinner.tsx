"use client";

import { useMemo } from "react";

interface LoadingSpinnerProps {
  width?: number;
  height?: number;
  className?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const sizeLoading = useMemo(() => {
    let height = 24 as number;
    let width = 24 as number;

    if (props?.width) {
      width = props?.width;
    }

    if (props?.height) {
      height = props?.height;
    }

    return { width, height };
  }, [props]);

  return (
    <div className={`flex justify-center items-center py-4 ${props?.className}`}>
      <div className="border-2 border-[#f2683a] border-t-transparent rounded-full animate-spin" style={{ width: sizeLoading.width, height: sizeLoading.height }} />
    </div>
  );
};

export default LoadingSpinner;
