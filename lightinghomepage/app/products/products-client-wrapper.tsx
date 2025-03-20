"use client";

import { Suspense } from "react";
import ProductsPageContent from "./products-content";

export default function ProductsClientWrapper() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12">Loading products...</div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
