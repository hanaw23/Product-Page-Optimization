"use client";

import { useRef, useCallback, useMemo } from "react";

interface InfiniteScrollListProps {
  data?: Array<unknown>;
  children?: (item: RecipeData, index: number) => React.ReactNode;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  hasMore?: boolean;
  error?: string | unknown;
}

const InfiniteScrollList = (props: InfiniteScrollListProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (props?.isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && props?.hasMore) {
            if (props?.setPage) {
              props?.setPage((prevPage) => prevPage + 1);
            }
          }
        },
        { threshold: 1.0 }
      );

      if (node && observer.current) {
        observer.current.observe(node);
      }
    },
    [props?.isLoading, props?.hasMore]
  );

  const getErrorMessage = (error: unknown): string => {
    if (!error) return "";
    if (typeof error === "string") return error;
    if (typeof error === "object" && "message" in error) return String(error.message);
    if (typeof error === "object" && "status" in error) return `Error: ${error.status}`;
    return "An unknown error occurred";
  };

  const renderListComponent = useMemo(() => {
    return (
      <>
        {props?.data?.map((el, index) => {
          const isLast = props?.data && props?.data?.length === index + 1;
          const childElement = props?.children ? props?.children(el as RecipeData, index as number) : null;

          if (isLast) {
            return (
              <div ref={lastPostElementRef} key={index}>
                {childElement}
              </div>
            );
          }

          return <div key={index}>{childElement}</div>;
        })}

        {props?.isLoading && <p className="text-center py-4">Loading...</p>}
        {props?.error && <p className="text-center text-red-500 py-4">{getErrorMessage(props?.error)}</p>}
      </>
    );
  }, [props?.data]);

  return renderListComponent;
};

export default InfiniteScrollList;
