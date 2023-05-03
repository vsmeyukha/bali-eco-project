import { ReactElement, useState } from "react";
import { Marker, OverlayView } from "@react-google-maps/api";
import PostOnMap from "./postOnMap/PostOnMap";
import { Coordinates } from "./GoogleMaps";

const markerIcon = {
  url: '/images/svgs/icons/marker.png',
}

interface MarkerAndPostOnMapProps {
  marker: Coordinates,
  isPostOnMapOpen: boolean,
  onMarkerClick: () => void,
}

const MarkerAndPostOnMap: React.FC<MarkerAndPostOnMapProps> = ({ marker, isPostOnMapOpen, onMarkerClick }): ReactElement => {
  return (
    <>
    <Marker position={marker} icon={markerIcon} onClick={onMarkerClick} />
    {isPostOnMapOpen &&
      <OverlayView position={marker} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
        <PostOnMap />
      </OverlayView>
    }
    </>
  );
}

export default MarkerAndPostOnMap;