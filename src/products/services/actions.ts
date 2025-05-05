import { Product } from "../interfaces/products";
import { productsApi } from "./api/productsApi";

interface GetProductsOptions {
  filterKey?: string;
}

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  await sleep(2);

  const { data } = await productsApi.get<Product[]>(`/products`, {
    params: { category: filterKey },
  });

  return data;
};
