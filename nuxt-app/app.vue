<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type CheckboxFieldOption = "ETI" | "Images" | "Itinerary" | "Marketing";

type Product = {
  uid: string;
  title?: string;
  product_information?: unknown;
  product_images?: unknown;
  product_itinerary?: unknown;
  marketing_rating?: number;
};

type UpdateableProductFields = Pick<
  Product,
  "product_information" | "product_images" | "product_itinerary" | "marketing_rating"
>;

const checkboxFieldOptions: CheckboxFieldOption[] = [
  "ETI",
  "Images",
  "Itinerary",
  "Marketing",
];

const productFieldMap: Record<CheckboxFieldOption, keyof UpdateableProductFields> = {
  ETI: "product_information",
  Images: "product_images",
  Itinerary: "product_itinerary",
  Marketing: "marketing_rating",
};

const products = ref<Product[]>([]);
const selectedProductUid = ref("");
const productSearchValue = ref("");
const error = ref("");
const isLoading = ref(true);
const selectedFields = ref<CheckboxFieldOption[]>([]);
const isUpdating = ref(false);
const updateError = ref("");
const updateSuccess = ref(false);
const currentEntryUid = ref("");

const selectableProducts = computed(() =>
  products.value.filter((product) => product.uid !== currentEntryUid.value),
);

const productOptions = computed(() =>
  selectableProducts.value.map((product) => ({
    uid: product.uid,
    label: product.title ?? product.uid,
  })),
);

const selectedProduct = computed(() =>
  selectableProducts.value.find((product) => product.uid === selectedProductUid.value),
);

const selectedProductLabel = computed(() => selectedProduct.value?.title ?? "");

const getErrorMessage = (err: unknown, fallback: string): string =>
  err instanceof Error ? err.message : fallback;

const formatFieldValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "No value found";
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(value, null, 2);
};

const selectedFieldValues = computed<Partial<Record<CheckboxFieldOption, unknown>>>(() => {
  const product = selectedProduct.value;

  if (!product || selectedFields.value.length === 0) {
    return {};
  }

  const productFieldValues: Record<CheckboxFieldOption, unknown> = {
    ETI: product.product_information ?? null,
    Images: product.product_images ?? null,
    Itinerary: product.product_itinerary ?? null,
    Marketing: product.marketing_rating ?? null,
  };

  return selectedFields.value.reduce<Partial<Record<CheckboxFieldOption, unknown>>>(
    (acc, field) => {
      acc[field] = productFieldValues[field];
      return acc;
    },
    {},
  );
});

const buildUpdateFields = (
  product: Product,
  fields: CheckboxFieldOption[],
): Partial<UpdateableProductFields> => {
  return fields.reduce<Partial<UpdateableProductFields>>((acc, field) => {
    const fieldKey = productFieldMap[field];

    switch (fieldKey) {
      case "product_information":
        acc.product_information = product.product_information;
        break;
      case "product_images":
        acc.product_images = product.product_images;
        break;
      case "product_itinerary":
        acc.product_itinerary = product.product_itinerary;
        break;
      case "marketing_rating":
        acc.marketing_rating = product.marketing_rating;
        break;
      default:
        break;
    }

    return acc;
  }, {});
};

const detectCurrentEntryUid = async () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const sdkModule = await import("@contentstack/app-sdk");
    const appSdk = await sdkModule.default.init();

    const locations = Object.values(appSdk?.location ?? {});
    for (const location of locations) {
      if (!location || typeof location !== "object") {
        continue;
      }

      const entry = (location as { entry?: { getData?: () => { uid?: string } } }).entry;
      const uid = entry?.getData?.()?.uid;

      if (uid) {
        currentEntryUid.value = uid;
        return;
      }
    }
  } catch {
    // SDK can fail outside Contentstack iframe context; page should still work.
  }
};

const loadProducts = async () => {
  isLoading.value = true;

  try {
    const response = await fetch("/api/products?locale=en&fetchFullList=true");
    const payload = (await response.json()) as { products?: Product[]; error?: string };

    if (!response.ok) {
      throw new Error(payload.error || `Failed to fetch products: ${response.status}`);
    }

    products.value = Array.isArray(payload.products) ? payload.products : [];
    selectedProductUid.value = "";
    productSearchValue.value = "";
    error.value = "";
  } catch (loadError) {
    error.value = getErrorMessage(loadError, "Failed to fetch products.");
  } finally {
    isLoading.value = false;
  }
};

const handleFieldToggle = (field: CheckboxFieldOption) => {
  if (selectedFields.value.includes(field)) {
    selectedFields.value = selectedFields.value.filter((item) => item !== field);
    return;
  }

  selectedFields.value = [...selectedFields.value, field];
};

const handleProductPickerChange = (value: string) => {
  productSearchValue.value = value;

  const selectedOption = productOptions.value.find((option) => option.label === value);
  if (selectedOption) {
    selectedProductUid.value = selectedOption.uid;
    return;
  }

  selectedProductUid.value = "";
};

const handleProductPickerBlur = () => {
  if (!productSearchValue.value.trim()) {
    productSearchValue.value = "";
  }
};

const handleProductPickerActivate = () => {
  productSearchValue.value = "";
};

const handleUpdate = async () => {
  const product = selectedProduct.value;
  if (!selectedProductUid.value || selectedFields.value.length === 0 || !product) {
    return;
  }

  const fields = buildUpdateFields(product, selectedFields.value);

  isUpdating.value = true;
  updateError.value = "";
  updateSuccess.value = false;

  try {
    if (currentEntryUid.value && currentEntryUid.value !== selectedProductUid.value) {
      const response = await fetch(`/api/products/${encodeURIComponent(currentEntryUid.value)}?locale=en`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || `Failed to update product: ${response.status}`);
      }

      updateSuccess.value = true;
    }
  } catch (err) {
    updateError.value = getErrorMessage(err, "Update failed.");
  } finally {
    isUpdating.value = false;
  }
};

onMounted(async () => {
  await detectCurrentEntryUid();
  await loadProducts();
});
</script>

<template>
  <main class="page">
    <section class="card">
      <h1>Product Field Copy App</h1>

      <p v-if="currentEntryUid"><strong>Current entry UID:</strong> {{ currentEntryUid }}</p>

      <h4>Select a product from Contentstack</h4>
      <p v-if="isLoading">Loading products...</p>
      <p v-if="!isLoading && error">{{ error }}</p>

      <template v-if="!isLoading && !error">
        <input
          id="product-picker"
          aria-label="Select a product"
          type="text"
          list="product-options"
          :placeholder="selectedProductLabel || 'Type to search products'"
          :value="productSearchValue"
          class="search"
          @input="handleProductPickerChange(($event.target as HTMLInputElement).value)"
          @blur="handleProductPickerBlur"
          @focus="handleProductPickerActivate"
          @click="handleProductPickerActivate"
        />

        <datalist id="product-options">
          <option v-for="option in productOptions" :key="option.uid" :value="option.label" />
        </datalist>

        <div class="checkbox-group" aria-label="Content fields">
          <label v-for="field in checkboxFieldOptions" :key="field" class="checkbox-item">
            <input
              type="checkbox"
              :checked="selectedFields.includes(field)"
              @change="handleFieldToggle(field)"
            />
            <span>{{ field }}</span>
          </label>
        </div>

        <div v-if="selectedProduct" class="details">
          <p>UID: {{ selectedProduct.uid }}</p>
          <p>Display name: {{ selectedProduct.title || "N/A" }}</p>

          <div v-if="selectedFields.length > 0" class="selected-field-values">
            <h4>Selected field values</h4>
            <div v-for="field in selectedFields" :key="field" class="selected-field-item">
              <strong>{{ field }}</strong>
              <pre>{{ formatFieldValue(selectedFieldValues[field]) }}</pre>
            </div>
          </div>

          <button :disabled="selectedFields.length === 0 || isUpdating" @click="handleUpdate">
            {{ isUpdating ? "Updating..." : "Update entry" }}
          </button>

          <p v-if="updateSuccess" class="success">Entry updated successfully.</p>
          <p v-if="updateError" class="error">{{ updateError }}</p>
        </div>
      </template>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background: radial-gradient(circle at top left, #dceeff 0%, #f8fbff 55%, #eef4ff 100%);
  color: #11213b;
}

.card {
  max-width: 400px;
  background: #ffffffde;
  border: 1px solid #c7d8f6;
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(17, 33, 59, 0.08);
  padding: 2rem;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  color: #2f67b7;
}

h1 {
  margin: 0.5rem 0 0.75rem;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
}

h2 {
  margin-top: 1.5rem;
}

.search {
  width: 370px;
  margin: 0.75rem 0 1rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid #aac3ea;
  border-radius: 8px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.checkbox-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.details {
  margin-top: 1rem;
}

.selected-field-values {
  margin: 1rem 0;
}

.selected-field-item {
  margin-bottom: 0.85rem;
}

pre {
  margin-top: 0.35rem;
  background: #f5f8ff;
  border: 1px solid #d4e2fb;
  border-radius: 8px;
  padding: 0.6rem;
  overflow-x: auto;
}

button {
  margin-top: 0.5rem;
  background: #2f67b7;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.62rem 0.95rem;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success {
  color: #0d6b38;
  margin-top: 0.75rem;
}

.error {
  color: #8d1f1f;
  margin-top: 0.75rem;
}
</style>
