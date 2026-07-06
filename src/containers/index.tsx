import { useEffect, useState } from "react";
import type { Product } from "../../lib/types/Contentstack/ContentTypes/Product";
import { getAllProducts } from "../common/api/getAllProducts";

const DefaultPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductUid, setSelectedProductUid] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      try {
        const nextProducts = await getAllProducts("en");

        if (!isActive) {
          return;
        }

        setProducts(nextProducts);
        setSelectedProductUid(nextProducts[0]?.uid ?? "");
        setError("");
      } catch (loadError) {
        if (!isActive) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to fetch products.",
        );
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  const selectedProduct = products.find(
    (product) => product.uid === selectedProductUid,
  );

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="app-component-content">
          <h2>Select a product from Contentstack</h2>
          {isLoading ? <p>Loading products...</p> : null}
          {error ? <p>{error}</p> : null}
          {!isLoading && !error ? (
            <>
              <select
                value={selectedProductUid}
                onChange={(event) => setSelectedProductUid(event.target.value)}
              >
                {products.map((product) => (
                  <option key={product.uid} value={product.uid}>
                    {product.lead_info?.display_name ?? product.title}
                  </option>
                ))}
              </select>
              {selectedProduct ? (
                <div>
                  <p>UID: {selectedProduct.uid}</p>
                  <p>Title: {selectedProduct.title}</p>
                  <p>
                    Display name: {selectedProduct.lead_info?.display_name ?? "N/A"}
                  </p>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DefaultPage;
