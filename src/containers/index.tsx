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

type UpdateableProductFields = Pick<
  Product,
  "product_information" | "product_images" | "product_itinerary" | "marketing_rating"
>;

type ProductDetailsProps = {
  selectedProduct: Product;
  selectedFields: CheckboxFieldOption[];
  selectedFieldValues: Partial<Record<CheckboxFieldOption, unknown>>;
  isUpdating: boolean;
  updateSuccess: boolean;
  updateError: string;
  onUpdate: () => void;
};

const productFieldMap: Record<CheckboxFieldOption, keyof UpdateableProductFields> = {
  ETI: "product_information",
  Images: "product_images",
  Itinerary: "product_itinerary",
  Marketing: "marketing_rating",
};

const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;

const formatFieldValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "No value found";
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(value, null, 2);
};

const buildUpdateFields = (
  selectedProduct: Product,
  selectedFields: CheckboxFieldOption[],
): Partial<UpdateableProductFields> => {
  return selectedFields.reduce<Partial<UpdateableProductFields>>((acc, field) => {
    const fieldKey = productFieldMap[field];

    switch (fieldKey) {
      case "product_information":
        acc.product_information = selectedProduct.product_information;
        break;
      case "product_images":
        acc.product_images = selectedProduct.product_images;
        break;
      case "product_itinerary":
        acc.product_itinerary = selectedProduct.product_itinerary;
        break;
      case "marketing_rating":
        acc.marketing_rating = selectedProduct.marketing_rating;
        break;
      default:
        break;
    }

    return acc;
  }, {});
};

const ProductDetails = ({
  selectedProduct,
  selectedFields,
  selectedFieldValues,
  isUpdating,
  updateSuccess,
  updateError,
  onUpdate,
}: ProductDetailsProps) => {
  return (
    <div>
      <p>UID: {selectedProduct.uid}</p>
      <br />
      <p>Display name: {selectedProduct.title ?? "N/A"}</p>
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
      <button onClick={onUpdate} disabled={selectedFields.length === 0 || isUpdating}>
        {isUpdating ? "Updating..." : "Update entry"}
      </button>
      <br />
      {updateSuccess ? <p>Entry updated successfully.</p> : null}
      {updateError ? <p>{updateError}</p> : null}
    </div>
  );
};

const DefaultPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductUid, setSelectedProductUid] = useState("");
  const [productSearchValue, setProductSearchValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFields, setSelectedFields] = useState<CheckboxFieldOption[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { location } = useAppLocation();
  const currentEntryUid =
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
        setSelectedProductUid("");
        setProductSearchValue("");
        setError("");
      } catch (loadError) {
        if (!isActive) {
          return;
        }

        setError(getErrorMessage(loadError, "Failed to fetch products."));
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
  }, [currentEntryUid]);

  const selectableProducts = products.filter(
    (product) => product.uid !== currentEntryUid,
  );

  const productOptions = selectableProducts.map((product) => ({
    uid: product.uid,
    label: product.title,
  }));

  const selectedProduct = selectableProducts.find(
    (product) => product.uid === selectedProductUid,
  );

  const selectedProductLabel = selectedProduct?.title ?? "";

  const selectedFieldValues = getSelectedProductFieldValues(
    selectedProduct,
    selectedFields,
  );

  const handleUpdate = async () => {
    if (!selectedProductUid || selectedFields.length === 0 || !selectedProduct) {
      return;
    }

    const fields = buildUpdateFields(selectedProduct, selectedFields);

    setIsUpdating(true);
    setUpdateError("");
    setUpdateSuccess(false);

    try {
      if (currentEntryUid && currentEntryUid !== selectedProductUid) {
        await updateProduct(currentEntryUid, fields);
        setUpdateSuccess(true);
      }
    } catch (err) {
      setUpdateError(getErrorMessage(err, "Update failed."));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFieldToggle = (field: CheckboxFieldOption) => {
    setSelectedFields((prevSelectedFields) =>
      prevSelectedFields.includes(field)
        ? prevSelectedFields.filter((item) => item !== field)
        : [...prevSelectedFields, field],
    );
  };

  const handleProductPickerChange = (value: string) => {
    setProductSearchValue(value);

    const selectedOption = productOptions.find((option) => option.label === value);
    if (selectedOption) {
      setSelectedProductUid(selectedOption.uid);
      return;
    }

    setSelectedProductUid("");
  };

  const handleProductPickerBlur = () => {
    if (!productSearchValue.trim()) {
      setProductSearchValue("");
    }
  };

  const handleProductPickerActivate = () => {
    // Clear typed query so suggestions can be reopened without blur/focus cycling.
    setProductSearchValue("");
  };

  return (
    <div>
      <div className="dashboard-container">
        <div className="app-component-content">
          {currentEntryUid && <p><strong>Current entry UID:</strong> {currentEntryUid}</p>}
          <h2>Select a product from Contentstack</h2>
          {isLoading && <p>Loading products...</p>}
          {!isLoading && error && <p>{error}</p>}
          {!isLoading && !error ? (
            <>
              <input
                type="text"
                list="product-options"
                placeholder={selectedProductLabel || "Type to search products"}
                value={productSearchValue}
                style={{ width: "300px" }}
                onChange={(event) => handleProductPickerChange(event.target.value)}
                onBlur={handleProductPickerBlur}
                onFocus={handleProductPickerActivate}
                onClick={handleProductPickerActivate}
              />
              <datalist id="product-options">
                {productOptions.map((option) => (
                  <option key={option.uid} value={option.label} />
                ))}
              </datalist>
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
              {selectedProduct && (
                <ProductDetails
                  selectedProduct={selectedProduct}
                  selectedFields={selectedFields}
                  selectedFieldValues={selectedFieldValues}
                  isUpdating={isUpdating}
                  updateSuccess={updateSuccess}
                  updateError={updateError}
                  onUpdate={handleUpdate}
                />
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DefaultPage;
