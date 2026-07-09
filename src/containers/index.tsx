import { useEffect, useState } from "react";
import type { Product } from "../../lib/types/Contentstack/ContentTypes/Product";
import { getAllProducts } from "../common/api/getAllProducts";
import { updateProduct } from "../common/api/updateProduct";
import {
  checkboxFieldOptions,
  type CheckboxFieldOption,
  getSelectedProductFieldValues,
} from "../common/utils/getSelectedProductFieldValues";
import { useAppLocation } from "../common/hooks/useAppLocation";

const DefaultPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductUid, setSelectedProductUid] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFields, setSelectedFields] = useState<CheckboxFieldOption[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { location } = useAppLocation();
  const currentEntryUid: string =
    (location && "entry" in location
      ? (location.entry?.getData() as { uid?: string } | undefined)?.uid
      : undefined) ?? "";

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

  const handleUpdate = async () => {
    if (!selectedProductUid || selectedFields.length === 0 || !selectedProduct) return;

    const fields = {
      ...(selectedFields.includes("ETI") ? { product_information: selectedProduct.product_information } : {}),
      ...(selectedFields.includes("Images") ? { product_images: selectedProduct.product_images } : {}),
      ...(selectedFields.includes("Itinerary") ? { product_itinerary: selectedProduct.product_itinerary } : {}),
      ...(selectedFields.includes("Marketing") ? { marketing_rating: selectedProduct.marketing_rating } : {}),
    };

    setIsUpdating(true);
    setUpdateError("");
    setUpdateSuccess(false);

    try {
      if(currentEntryUid !== selectedProductUid && currentEntryUid !== '') {
        await updateProduct(currentEntryUid, fields);
        setUpdateSuccess(true);
      }
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setIsUpdating(false);
    }
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
          {currentEntryUid ? (
            <p><strong>Current entry UID:</strong> {currentEntryUid}</p>
          ) : null}
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
                  <br />
                  <button
                    onClick={handleUpdate}
                    disabled={selectedFields.length === 0 || isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update entry"}
                  </button>
                  {updateSuccess ? <p>Entry updated successfully.</p> : null}
                  {updateError ? <p>{updateError}</p> : null}
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
