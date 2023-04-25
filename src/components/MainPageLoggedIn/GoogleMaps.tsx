import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MarkerIcon from '../../../public/images/svgs/icons/marker.png';

const containerStyle = {
  width: '100%',
  height: '1000px',
  zIndex: 1
}

interface Coordinates {
  lat: number,
  lng: number,
}

const center: Coordinates = {
  lat: -8.4095,
  lng: 115.1889,
};

function MapComponent() {

  const [markers, setMarkers] = useState<Coordinates[]>([center]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const newPosition: Coordinates = {
      lat: event.latLng?.lat() ?? 0,
      lng: event.latLng?.lng() ?? 0,
    }

    setMarkers([...markers, newPosition]);
  }

  const removeMarker = (event: google.maps.MapMouseEvent) => {
    const markersWithoutSelectedMarker = markers.filter(marker => {
      if (marker.lat !== event.latLng?.lat() && marker.lng !== event.latLng?.lng()) {
        return marker;
      }
    });

    setMarkers(markersWithoutSelectedMarker);

  }

  const markerIcon = {
    url: '/images/svgs/icons/marker.png',
  }

  return (
    <div className="relative h-[1000px] w-full">
      <LoadScript googleMapsApiKey="AIzaSyD4_JfTWssNSFo6OASVhSpaKJ-0od5TkKQ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {/* Additional map components, like markers or overlays, can be added as children here */}
          <Marker position={center} />
          {markers.map((marker, index) => {
            return (
              <Marker position={marker} key={index} onClick={removeMarker} icon={markerIcon} />
            )
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapComponent;
