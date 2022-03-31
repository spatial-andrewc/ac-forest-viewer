import { Feature, Point, Polygon } from "geojson"

/**
 * Type definitions for the data fetched from the API calls
 */

export type ForestOverview = {
  id: number;
  name: string;
  type: string;
  country_code: string;
  description: string;
  image_url: string
};

export type ForestOverviewResponseObject = {
  items: ForestOverview[];
  page: number;
  size: number;
  total: number;
};

export type ForestDetailProps = ForestOverview & {
  country: string
  carbon_stored: number
  carbon_stored_30_days: number
  bear_mortality: string
  critical_fire_risk: string
  stream_flow: string
  area_sqm: number
  lng_lat: Point
}

export type ForestDetailResponseObject = Feature<Polygon, ForestDetailProps>