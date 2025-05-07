import { useMutation, useQueryClient } from "@tanstack/react-query";
import { producActions, Product } from "..";

export function useProductMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: producActions.createProduct,
    onSuccess: (data) => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["products", { filterKey: data.category }],
      //   });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: data.category }],
        (old) => {
          const productData = data as Product; // Ensure data is treated as Product
          if (!old) return [productData];

          return [...old, productData];
        }
      );
    },
  });

  return mutation;
}
