import { FC } from "react";
import { Skeleton } from "@mui/material";
import Map, { Source, Layer, MapProvider } from "react-map-gl";
import { ForestDetailResponseObject } from "../../api/types";
import "mapbox-gl/dist/mapbox-gl.css";
import { PACHAMA_MAPBOX_MAP_ID } from "../../common/constants";
import { MapActions } from "./MapActions"

type ForestMapProps = {
  feature: ForestDetailResponseObject | undefined;
  isLoading: boolean;
};

/**
 * Component that renders a 3D map with a geospatial data visualisation
 * describing where the 'forest' is with respect to regional landscape.
 */
export const ForestMap: FC<ForestMapProps> = ({ feature, isLoading }) => {

  return (
    <>
      {isLoading || !feature ? (
        <Skeleton width="100%" height="100%" variant="rectangular" />
      ) : (
        <MapProvider>
          <Map
            id={PACHAMA_MAPBOX_MAP_ID}
            initialViewState={{
              longitude: feature.properties.lng_lat.coordinates[0],
              latitude: feature.properties.lng_lat.coordinates[1],
              zoom: 14,
              pitch: 50,
            }}
            attributionControl={false}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            mapboxAccessToken={import.meta.env.VITE_REACT_MAP_ACCESS_TOKEN}
            terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
          >
            <Source
              id="mapbox-dem"
              type="raster-dem"
              url="mapbox://mapbox.mapbox-terrain-dem-v1"
              tileSize={512}
              maxzoom={14}
            />
            <Source id="map-source" type="geojson" data={feature}>
              <Layer
                id="forest-line"
                type="line"
                paint={{
                  "line-width": 3,
                  "line-color": "#fff",
                }}
              />
              <Layer
                id="forest-outline"
                type="line"
                beforeId="forest-line"
                paint={{
                  "line-width": 5,
                  "line-color": "#fff",
                  "line-opacity": 0.4,
                }}
              />
            </Source>
            {feature && <MapActions feature={feature}/>}
          </Map>
        </MapProvider>
      )}
    </>
  );
};
