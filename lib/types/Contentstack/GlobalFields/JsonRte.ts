import type { IHtmlToJsonElementTagsAttributes } from "@contentstack/json-rte-serializer";

export type JsonRte =
  | ({
      children?: JsonRte[];
    } & IHtmlToJsonElementTagsAttributes)
  | ({ text: string } & Partial<IHtmlToJsonElementTagsAttributes>);
