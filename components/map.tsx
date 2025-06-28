import React from 'react'
import { GoogleMap, Libraries, MarkerF, useLoadScript } from "@react-google-maps/api";
import {lightMapStyles} from '@/components/clinicsmap';
const defaultMapZoom = 18
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: 'auto',
  mapTypeId: 'satellite',
  mapTypeControl: false, 
  streetViewControl: false, 
  fullscreenControl: false,
  disableDefaultUI: true
};
const Map = () => {
    return (
        <div>
            <GoogleMap
            mapContainerStyle={defaultMapContainerStyle}
            center={mapCenter}
            zoom={defaultMapZoom}
            options={{
                styles: lightMapStyles, // Use the new light style here
                disableDefaultUI: false,
            }}
            onLoad={onLoad}
            onUnmount={onUnmount}
            
            />
        </div>
    )
}

export default Map;