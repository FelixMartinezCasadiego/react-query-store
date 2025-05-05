import { useQueryClient } from "@tanstack/react-query";
import { producActions } from "..";

export function usePrefetchProduct() {
  const queryClient = useQueryClient();

  const preFetchProduct = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: () => producActions.getProductById(id),
    });
  };

  return preFetchProduct;
}
