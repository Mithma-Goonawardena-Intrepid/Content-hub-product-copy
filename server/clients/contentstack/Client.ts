import pkg, { type LivePreviewQuery } from "contentstack";
const { Stack } = pkg;

const getRuntimeConfig = () => ({
  public: {
    contentstackApiKey: process.env.CONTENTSTACK_API_KEY ?? "",
    contentstackEnableLivePreview:
      process.env.CONTENTSTACK_ENABLE_LIVE_PREVIEW === "true",
  },
  contentstackDeliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN ?? "",
  contentstackEnv: process.env.CONTENTSTACK_ENV ?? "",
  contentstackBranchAlias: process.env.CONTENTSTACK_BRANCH_ALIAS ?? "",
  contentstackManagementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN ?? "",
  contentstackPreviewToken: process.env.CONTENTSTACK_PREVIEW_TOKEN ?? "",
  contentstackRuntimeHost: process.env.CONTENTSTACK_RUNTIME_HOST ?? "",
});

type ClientOptions = {
  livePreviewHash: string;
  contentTypeUid: string;
};

const getClientStack = (
  options?: ClientOptions,
  isManagementTokenMode?: boolean,
) => {
  const clientStack = Stack({
    api_key: getRuntimeConfig().public.contentstackApiKey,
    delivery_token: getRuntimeConfig().contentstackDeliveryToken,
    environment: getRuntimeConfig().contentstackEnv,
    branch: getRuntimeConfig().contentstackBranchAlias,
    ...(options
      ? {
          live_preview: {
            enable: getRuntimeConfig().public.contentstackEnableLivePreview,
            ...(isManagementTokenMode
              ? {
                  management_token:
                    getRuntimeConfig().contentstackManagementToken,
                }
              : {
                  preview_token: getRuntimeConfig().contentstackPreviewToken,
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
    clientStack.setHost(getRuntimeConfig().contentstackRuntimeHost);
  }

  return clientStack;
};

export type { ClientOptions };
export { getClientStack };
