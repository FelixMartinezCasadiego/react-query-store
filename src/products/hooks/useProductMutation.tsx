import { useMutation } from "@tanstack/react-query";
import { producActions } from "..";

export function useProductMutation() {
  const mutation = useMutation({
    mutationFn: producActions.createProduct,
    onSuccess: () => console.log("Producto creado"),
    onSettled: () => console.log("on settled"),
  });

  return mutation;
}
