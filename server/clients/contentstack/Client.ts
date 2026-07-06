import "dotenv/config";
import pkg, { type LivePreviewQuery } from "contentstack";
const { Stack } = pkg;

const normalizeEnvValue = (value?: string): string => {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();

  // Support quoted values while preserving inner content.
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
};

const getEnvValue = (primaryKey: string, fallbackKey?: string) => {
  const primaryValue = normalizeEnvValue(process.env[primaryKey]);

  if (primaryValue) {
    return primaryValue;
  }

  const fallbackValue = normalizeEnvValue(
    fallbackKey ? process.env[fallbackKey] : undefined,
  );

  if (fallbackValue) {
    return fallbackValue;
  }

  return "";
};

const runtimeConfig = {
  apiKey: getEnvValue("CONTENTSTACK_API_KEY", "VITE_CONTENTSTACK_API_KEY"),
  enableLivePreview:
    getEnvValue(
      "CONTENTSTACK_ENABLE_LIVE_PREVIEW",
      "VITE_CONTENTSTACK_ENABLE_LIVE_PREVIEW",
    ).toLowerCase() === "true",
  deliveryToken: getEnvValue(
    "CONTENTSTACK_DELIVERY_TOKEN",
    "VITE_CONTENTSTACK_DELIVERY_TOKEN",
  ),
  environment: getEnvValue("CONTENTSTACK_ENV", "VITE_CONTENTSTACK_ENV"),
  branchAlias: getEnvValue(
    "CONTENTSTACK_BRANCH_ALIAS",
    "VITE_CONTENTSTACK_BRANCH_ALIAS",
  ),
  managementToken: getEnvValue(
    "CONTENTSTACK_MANAGEMENT_TOKEN",
    "VITE_CONTENTSTACK_MANAGEMENT_TOKEN",
  ),
  previewToken: getEnvValue(
    "CONTENTSTACK_PREVIEW_TOKEN",
    "VITE_CONTENTSTACK_PREVIEW_TOKEN",
  ),
  runtimeHost: getEnvValue(
    "CONTENTSTACK_RUNTIME_HOST",
    "VITE_CONTENTSTACK_RUNTIME_HOST",
  ),
};

type ClientOptions = {
  livePreviewHash: string;
  contentTypeUid: string;
};

const getClientStack = (
  options?: ClientOptions,
  isManagementTokenMode?: boolean,
) => {
  const clientStack = Stack({
    api_key: runtimeConfig.apiKey,
    delivery_token: runtimeConfig.deliveryToken,
    environment: runtimeConfig.environment,
    branch: runtimeConfig.branchAlias,
    ...(options
      ? {
          live_preview: {
            enable: runtimeConfig.enableLivePreview,
            ...(isManagementTokenMode
              ? {
                  management_token: runtimeConfig.managementToken,
                }
              : {
                  preview_token: runtimeConfig.previewToken,
                }),
          },
        }
      : {}),
  });

  if (options) {
    clientStack.livePreviewQuery({
      content_type_uid: options.contentTypeUid,
      live_preview: options.livePreviewHash,
    } as LivePreviewQuery);
  } else {
    if (runtimeConfig.runtimeHost) {
      clientStack.setHost(runtimeConfig.runtimeHost);
    }
  }

  return clientStack;
};

export type { ClientOptions };
export { getClientStack };
