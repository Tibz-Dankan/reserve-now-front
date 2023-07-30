import React, { Fragment } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 150000,
      networkMode: "cache-and-network",
      cacheTime: 300000,
    },
    mutations: {
      networkMode: "always",
    },
  },
});

export const ReactQueryProvider = (props) => {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        {props.children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Fragment>
  );
};
