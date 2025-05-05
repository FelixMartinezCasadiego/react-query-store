import { useQuery } from "@tanstack/react-query";
import { producActions } from "..";

interface Options {
  id: number;
}

export function useProduct({ id }: Options) {
  const {
    data: product,
    isLoading,
    isError,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => producActions.getProductById(id),
    staleTime: 1000 * 60 * 60,
  });

  return { isError, product, isLoading, isFetching, error };
}
