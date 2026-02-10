/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";

import { ProductCard } from "../product-card";
import { fetchProducts, type FakeStoreProduct } from "../../services/fakestore";

export function Content() {
  const [products, setProducts] = useState<FakeStoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartById, setCartById] = useState<Record<number, number>>({});

  const cartCount = useMemo(
    () => Object.values(cartById).reduce((sum, qty) => sum + qty, 0),
    [cartById]
  );

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts(controller.signal);
        setProducts(data);
      } catch (e) {
        // Ignore AbortError (happens on hot reload / navigation)
        if ((e as any)?.name !== "AbortError") {
          setError((e as Error)?.message ?? "Failed to load products");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  function handleAddToCart(p: FakeStoreProduct) {
    setCartById((prev) => ({ ...prev, [p.id]: (prev[p.id] ?? 0) + 1 }));
  }

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="ecom-header oj-flex oj-sm-align-items-center oj-sm-justify-content-space-between oj-sm-padding-4x">
        <div>
          <div class="oj-typography-heading-sm">Fake Store</div>
          <div class="oj-typography-body-sm">Products loaded from fakestoreapi.com</div>
        </div>
        <div class="ecom-cart-pill oj-typography-body-sm" title="Cart item count">
          Cart: <span class="ecom-cart-count">{cartCount}</span>
        </div>
      </div>

      {loading && <div class="oj-sm-padding-4x">Loading products…</div>}
      {error && (
        <div class="oj-sm-padding-4x">
          <div class="oj-typography-heading-xs">Could not load products</div>
          <div class="oj-typography-body-sm ecom-error">{error}</div>
        </div>
      )}

      {!loading && !error && (
        <section class="ecom-grid" aria-label="Product list">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
          ))}
        </section>
      )}
    </div>
  );
};
