import { useEffect, useState } from "react";
import type { Product } from "../../lib/types/Contentstack/ContentTypes/Product";
import { getAllProducts } from "../common/api/getAllProducts";
import {
  checkboxFieldOptions,
  type CheckboxFieldOption,
  getSelectedProductFieldValues,
} from "../common/utils/getSelectedProductFieldValues";

const DefaultPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductUid, setSelectedProductUid] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFields, setSelectedFields] = useState<CheckboxFieldOption[]>([]);

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

  const selectedFieldValues = getSelectedProductFieldValues(
    selectedProduct,
    selectedFields,
  );

  const formatFieldValue = (value: unknown): string => {
    if (value === null || value === undefined) {
      return "No value found";
    }

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }

    return JSON.stringify(value, null, 2);
  };

  const handleFieldToggle = (field: CheckboxFieldOption) => {
    setSelectedFields((prevSelectedFields) => {
      if (prevSelectedFields.includes(field)) {
        return prevSelectedFields.filter((item) => item !== field);
      }

      return [...prevSelectedFields, field];
    });
  };

  return (
    <div >
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
              <div className="checkbox-group" aria-label="Content fields">
                {checkboxFieldOptions.map((field) => (
                  <label key={field} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedFields.includes(field)}
                      onChange={() => handleFieldToggle(field)}
                    />
                    <span>{field}</span>
                  </label>
                ))}
              </div>
              {selectedProduct ? (
                <div>
                  <p>UID: {selectedProduct.uid}</p><br/>
                  <p>
                    Display name: {selectedProduct.lead_info?.display_name ?? "N/A"}
                  </p>
                  {selectedFields.length > 0 ? (
                    <div className="selected-field-values">
                      <h4>Selected field values</h4>
                      {selectedFields.map((field) => (
                        <div key={field} className="selected-field-item">
                          <strong>{field}</strong>
                          <pre>{formatFieldValue(selectedFieldValues[field])}</pre>
                        </div>
                      ))}
                    </div>
                  ) : null}
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
