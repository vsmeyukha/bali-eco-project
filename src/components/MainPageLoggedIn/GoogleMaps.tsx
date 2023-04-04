import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '1000px',
  zIndex: 1,
}

const center = {
  lat: -8.4095,
  lng: 115.1889,
};

const mapOptions = {
  disableDefaultUI: true,
};

function MapComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyD4_JfTWssNSFo6OASVhSpaKJ-0od5TkKQ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Additional map components, like markers or overlays, can be added as children here */}
        <Marker position={center }/>
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
