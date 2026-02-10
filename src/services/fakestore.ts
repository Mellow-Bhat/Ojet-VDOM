export type FakeStoreRating = {
  rate: number;
  count: number;
};

export type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: FakeStoreRating;
};

const API_BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts(signal?: AbortSignal): Promise<FakeStoreProduct[]> {
  const res = await fetch(`${API_BASE_URL}/products`, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as FakeStoreProduct[];
}
