import type {
	ProductInformation,
	ProductItinerary,
	Picture,
} from "../../../../lib/types/Contentstack";

type UpdatableProductFields = {
	product_information?: ProductInformation[];
	marketing_rating?: number;
	product_images?: Picture[];
	product_itinerary?: ProductItinerary[];
};

type UpdateProductByElementsIdParams = {
	elementsId: string | number;
	fields: UpdatableProductFields;
	locale?: string;
};

type ContentstackEntry = {
	uid: string;
};

const getEnvValue = (primaryKey: string, fallbackKey?: string): string => {
	const primary = (process.env[primaryKey] ?? "").trim();
	if (primary) {
		return primary;
	}

	const fallback = fallbackKey ? (process.env[fallbackKey] ?? "").trim() : "";
	return fallback;
};

const getCmaConfig = () => {
	return {
		apiKey: getEnvValue("CONTENTSTACK_API_KEY", "VITE_CONTENTSTACK_API_KEY"),
		managementToken: getEnvValue(
			"CONTENTSTACK_MANAGEMENT_TOKEN",
			"VITE_CONTENTSTACK_MANAGEMENT_TOKEN",
		),
		branch: getEnvValue("CONTENTSTACK_BRANCH_ALIAS", "VITE_CONTENTSTACK_BRANCH_ALIAS"),
		cmaHost: getEnvValue("CONTENTSTACK_CMA_HOST") || "https://api.contentstack.io",
	};
};

const getCmaHeaders = () => {
	const config = getCmaConfig();

	if (!config.apiKey || !config.managementToken) {
		throw new Error(
			"Missing Contentstack CMA credentials. Please set API key and management token.",
		);
	}

	return {
		api_key: config.apiKey,
		authorization: config.managementToken,
		branch: config.branch,
		"Content-Type": "application/json",
	} as Record<string, string>;
};

const buildCmaUrl = (path: string, queryParams?: URLSearchParams) => {
	const { cmaHost } = getCmaConfig();
	const normalizedHost = cmaHost.startsWith("http") ? cmaHost : `https://${cmaHost}`;
	const queryString = queryParams ? `?${queryParams.toString()}` : "";
	return `${normalizedHost}${path}${queryString}`;
};

const findProductEntryByElementsId = async (
	elementsId: string | number,
	locale: string,
): Promise<ContentstackEntry> => {
	const params = new URLSearchParams();
	params.set("locale", locale);
	params.set("include_working", "true");
	params.set("query", JSON.stringify({ "elements_ref.elements_id": elementsId }));

	const response = await fetch(
		buildCmaUrl("/v3/content_types/product/entries", params),
		{
			method: "GET",
			headers: getCmaHeaders(),
		},
	);

	const payload = (await response.json().catch(() => ({}))) as {
		entries?: ContentstackEntry[];
		error_message?: string;
	};

	if (!response.ok) {
		throw new Error(
			payload.error_message ||
				`Failed to find product entry for elements ID ${elementsId}. Status: ${response.status}`,
		);
	}

	const targetEntry = payload.entries?.[0];

	if (!targetEntry?.uid) {
		throw new Error(`No product entry found for elements ID ${elementsId}.`);
	}

	return targetEntry;
};

export const updateProductFieldsByElementsId = async ({
	elementsId,
	fields,
	locale = "en-us",
}: UpdateProductByElementsIdParams) => {
	const targetEntry = await findProductEntryByElementsId(elementsId, locale);

	const updatePayload = {
		entry: {
			...(fields.product_information !== undefined
				? { product_information: fields.product_information }
				: {}),
			...(fields.marketing_rating !== undefined
				? { marketing_rating: fields.marketing_rating }
				: {}),
			...(fields.product_images !== undefined
				? { product_images: fields.product_images }
				: {}),
			...(fields.product_itinerary !== undefined
				? { product_itinerary: fields.product_itinerary }
				: {}),
		},
		locale,
	};

	const response = await fetch(
		buildCmaUrl(`/v3/content_types/product/entries/${targetEntry.uid}`),
		{
			method: "PUT",
			headers: getCmaHeaders(),
			body: JSON.stringify(updatePayload),
		},
	);

	const payload = (await response.json().catch(() => ({}))) as {
		entry?: { uid?: string };
		error_message?: string;
	};

	if (!response.ok) {
		throw new Error(
			payload.error_message ||
				`Failed to update product entry ${targetEntry.uid}. Status: ${response.status}`,
		);
	}

	return {
		updatedEntryUid: payload.entry?.uid || targetEntry.uid,
		elementsId,
	};
};

export type { UpdateProductByElementsIdParams, UpdatableProductFields };
