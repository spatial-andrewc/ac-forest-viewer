import { FC, useEffect } from "react";
import { ForestDetailResponseObject } from "../../api/types";
import { useMap } from "react-map-gl";
import { PACHAMA_MAPBOX_MAP_ID } from "../../common/constants";
import bbox  from "@turf/bbox";

type MapActionsProps = {
  feature: ForestDetailResponseObject;
};

type Bbox = [number, number, number, number]

/**
 * Component that taps into the mapbox instance and will fit the 
 * map's window to the bounding box of the geojson feature. This just
 * provides a way to dynamically adjust the view so we're always looking at the forest.
 */
export const MapActions: FC<MapActionsProps> = ({ feature }) => {
  
  const map = useMap()[PACHAMA_MAPBOX_MAP_ID];

  useEffect(() => {
    if (map) {
      map.fitBounds(bbox(feature) as Bbox, {padding: 200});
    }
  }, [map, feature]);

  return null;
};
