import { useQuery } from "@tanstack/react-query";
import { producActions } from "..";

interface Options {
  filterKey?: string;
}

export function useProducts({ filterKey }: Options) {
  const {
    data: products = [],
    isLoading,
    isError,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["products", { filterKey }],
    queryFn: () => producActions.getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60,
  });

  return { isError, products, isLoading, isFetching, error };
}
