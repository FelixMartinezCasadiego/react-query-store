import { useMutation, useQueryClient } from "@tanstack/react-query";
import { producActions, type Product } from "..";

export function useProductMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: producActions.createProduct,
    onMutate: (product) => {
      console.log("Mutando - optimistic update");

      // Optimistic Product
      const optimisticProduct = { id: Math.random(), ...product };

      // Save product in query client cache
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (old) => {
          if (!old) return [optimisticProduct];
          return [...old, optimisticProduct];
        }
      );

      return { optimisticProduct };
    },
    onSuccess: (product: Product, _variables, context) => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["products", { filterKey: data.category }],
      //   });
      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (old) => {
          if (!old) return [product];

          return old.map((cacheProduct) =>
            cacheProduct.id === context?.optimisticProduct.id
              ? product
              : cacheProduct
          );
        }
      );
    },

    onError: (error, variables, context) => {
      console.log({ error, variables, context });

      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        (old) => {
          if (!old) return [];

          return old.filter((cacheProduct) => {
            return cacheProduct.id !== context?.optimisticProduct.id;
          });
        }
      );
    },
  });

  return mutation;
}
