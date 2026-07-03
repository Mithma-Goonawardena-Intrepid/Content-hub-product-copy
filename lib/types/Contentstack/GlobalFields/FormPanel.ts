import type { IHtmlToJsonElementTagsAttributes } from "@contentstack/json-rte-serializer";

export type FormPanel = {
  form_id: string;
  submission_heading: string;
  submission_message: IHtmlToJsonElementTagsAttributes;
};
