import type { IHtmlToJsonElementTagsAttributes } from "@contentstack/json-rte-serializer";
import type { LeadInfo } from "../GlobalFields";
import type { Picture } from "./Picture";
import type { CommonContentTypeFields } from "./Common";
import type { ModularPage } from "./ModularPage";
import type { Destination } from "./Destination";
import type { RoomOption } from "./RoomOption";
import type { ElementsRef, Video } from "~~/lib/types/Contentstack";

export type BoatDetails = {
  type: string;
  classification?: string;
  model?: string;
  total_passengers?: number;
  total_crew?: number;
  passenger_crew_ratio?: string;
  guide?: string;
  region?: Destination[];
};

export type TechnicalSpecifications = {
  built_in?: string;
  cruise_speed?: string;
  decks?: string;
  length?: string;
  width?: string;
  ice_class?: string;
  speed?: string;
  electricity?: string;
  gross_tonnage?: string;
  life_rafts?: string;
  zodiacs?: string;
  safety?: string;
  deckothers?: string;
  year_built?: string;
  other?: string;
};

export type BoatFeatures = {
  facilities?: { entry: string[] };
  equipment?: { entry: string[] };
  details?: BoatDetails;
  accessibility?: { entry: string[] };
  technical_specifications?: TechnicalSpecifications;
};

export type Boat = CommonContentTypeFields &
  BoatFeatures & {
    lead_info: LeadInfo;
    url: string;
    elements_ref?: ElementsRef;
    classification?: string;
    total_passengers?: number;
    deck_plan?: Picture[];
    parent?: ModularPage[];
    room_options?: RoomOption[];
    gallery?: Picture[];
    video: Video[];
    published_url: boolean;
    trip_type?: string;
  };

export type BoatSection = {
  display_name: string;
  description: IHtmlToJsonElementTagsAttributes;
  boats: Boat[];
};
