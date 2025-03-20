import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import applicationsData from "@/data/applications.json";
import ProductSingleView from "./product-single-view";

export default function ProductPage({ params }: { params: { id: string } }) {
  // Properly unwrap params using React.use
  const id = params.id;

  // Find the product data
  const product = productsData.find((p) => p.id === id);

  // Find related data
  const category = product
    ? categoriesData.find((c) => c.id === product.category_id)
    : null;
  const applicationIds = product?.application_ids || [];
  const applications = applicationsData.filter((a) =>
    applicationIds.includes(a.id)
  );

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  return (
    <ProductSingleView
      product={product}
      category={category}
      applications={applications}
    />
  );
}
