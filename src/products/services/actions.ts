import { Product } from "../interfaces/products";
import { productsApi } from "./api/productsApi";

interface GetProductsOptions {
  filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  const { data } = await productsApi.get<Product[]>(`/produtcs`);
  return data;
};
