/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h } from "preact";
import "ojs/ojbutton";

import type { FakeStoreProduct } from "../services/fakestore";

type Props = Readonly<{
  product: FakeStoreProduct;
  onAddToCart: (p: FakeStoreProduct) => void;
}>;

export function ProductCard({ product, onAddToCart }: Props) {
  return (
    <article class="ecom-product-card oj-sm-padding-2x oj-sm-margin-2x">
      <div class="ecom-product-imageWrap">
        <img class="ecom-product-image" src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div class="ecom-product-body">
        <div class="ecom-product-title oj-typography-subheading-xs" title={product.title}>
          {product.title}
        </div>

        <div class="ecom-product-meta oj-flex oj-sm-align-items-center oj-sm-justify-content-space-between oj-sm-margin-2x-top">
          <div class="ecom-product-price oj-typography-heading-xs">${product.price.toFixed(2)}</div>
          <div class="ecom-product-rating oj-typography-body-xs">
            {product.rating?.rate?.toFixed?.(1) ?? "-"} ({product.rating?.count ?? 0})
          </div>
        </div>

        <div class="ecom-product-category oj-typography-body-xs oj-sm-margin-2x-top">
          {product.category}
        </div>

        <p class="ecom-product-desc oj-typography-body-sm oj-sm-margin-2x-top" title={product.description}>
          {product.description}
        </p>

        <div class="oj-sm-margin-4x-top">
          <oj-button
            chroming="callToAction"
            onojAction={() => onAddToCart(product)}
            class="ecom-add-btn"
          >
            Add to cart
          </oj-button>
        </div>
      </div>
    </article>
  );
}
