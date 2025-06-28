'use client'

//Map component Component from library
import React, { useState, useCallback, useEffect, useRef } from 'react';
// Make sure to import MarkerF and useLoadScript if needed
import { GoogleMap, Libraries, MarkerF, useLoadScript } from "@react-google-maps/api";
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { LocationsScreens } from './locationsscreens';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import Star from './icons/star';
import Mappin2 from './icons/mappin2';
//Map's styling
export const defaultMapContainerStyle = {
  width: '100%',
  height: '680px',
  borderRadius: '24px',
};
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


// Assume icons are defined here or imported. IMPORTANT: Accessing window.google requires the library to be loaded.

export default function ClinicsMap({ startingClinic, zoom } :  {
  startingClinic? : { name : string, lat : number, lng : number, address : string}, 
  zoom? : number
}) {

  //const {location} = useGeolocation();
   // Optional: State to hold map instance
   const [map, setMap] = useState(null);
   const [ selectedClinc, setSeletecedClinic ] = useState<{id : number, name : string, lat : number, lng : number, address : string} | undefined>(startingClinic ? startingClinic : undefined)
  
   const [ mapCenter, setMapCenter ] = useState(startingClinic ? {lat: startingClinic.lat , lng: startingClinic.lng} : { lat: 26.650201131340268, lng:  -80.17332897695478, })
   const isInitialMount = useRef(true); // <-- Add this ref, initially true
   useEffect(() => {
    if( startingClinic ){
      setSeletecedClinic(startingClinic)
      setMapCenter({lat: startingClinic.lat , lng: startingClinic.lng})
    }
   }, [startingClinic])
   const onLoad = useCallback(function callback(mapInstance) {
     // You can save the map instance if you need to interact with it
     setMap(mapInstance);
     // Example: Adjust bounds to fit markers after load (optional)
     // const bounds = new window.google.maps.LatLngBounds();
     // clinics.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
     // mapInstance.fitBounds(bounds);
   }, []);
 
   const onUnmount = useCallback(function callback(mapInstance) {
     setMap(null);
   }, []);

   // Cache for generated selected icons to avoid recalculating SVG/URI/Icon object repeatedly
   const selectedIconCache = {};

  // --- Function to generate the SELECTED marker SVG ---
  const createSelectedIcon = (clinicName) => {
    // if (selectedIconCache[clinicName]) {
    //   return selectedIconCache[clinicName];
    // }

    // --- Define the TARGET DISPLAY SIZE for the selected marker ---
    // Adjust these values to make it look good relative to the 60x40 default marker
    const targetScaledWidth = 300; // Make it wider for text
    const targetScaledHeight = 80;  // Slightly taller than default? Adjust as needed.

    // --- Internal SVG element dimensions (can be simpler now) ---
    // --- Internal SVG element dimensions (INCREASED as requested) ---
    const internalIconWidth = 30;   // Allocated space for the pin graphic
    const internalIconHeight = 35;  // Allocated space for the pin graphic
    const internalPaddingX = 35;    // INCREASED horizontal padding
    const internalPaddingY = 60;    // INCREASED vertical padding
    const internalFontSize = 34;    // INCREASED font size
    const fontFamily = 'Reem Kufi, sans-serif'; // SET Font Family
    const fontWeight = '600';     // Example: slightly bolder

    // Estimate text width based on internal font size
    const estimatedTextWidth = clinicName.length * (internalFontSize * 0.55);
    const internalContentWidth = internalIconWidth + internalPaddingX + estimatedTextWidth;

    // Calculate internal SVG dimensions (these define the viewBox)
    const internalSvgWidth = internalContentWidth + internalPaddingX * 2;
    const internalSvgHeight = internalIconHeight + internalPaddingY * 2;

    // Simple white pin path (adjust 'd' if needed)
    const iconPath = `<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99996 17.75C7.33396 17.75 6.70296 17.496 6.22296 17.035C5.97982 16.7996 5.73291 16.5642 5.48317 16.3261L5.45894 16.303L5.45888 16.3029C2.48689 13.4739 -1.21203 9.95298 0.841952 5.01602C2.02695 2.16502 4.90396 0.25 7.99996 0.25C11.096 0.25 13.9739 2.16502 15.1589 5.01602C17.2199 9.9708 13.4903 13.5087 10.4943 16.3506L10.494 16.351C10.251 16.581 10.011 16.809 9.77696 17.034C9.29696 17.496 8.66596 17.75 7.99996 17.75ZM7.99996 1.75C5.50196 1.75 3.18196 3.29399 2.22696 5.59199C0.569017 9.57686 3.58078 12.4438 6.49269 15.2157L6.49298 15.216C6.75498 15.465 7.01295 15.711 7.26495 15.955C7.46195 16.144 7.72396 16.25 7.99996 16.25C8.27596 16.25 8.53797 16.145 8.73697 15.954C8.92005 15.7779 9.1067 15.6006 9.2951 15.4216L9.29511 15.4216L9.46197 15.263C12.401 12.476 15.439 9.59399 13.775 5.59199C12.819 3.29399 10.498 1.75 7.99996 1.75ZM8 11.25C6.208 11.25 4.75 9.792 4.75 8C4.75 6.208 6.208 4.75 8 4.75C9.792 4.75 11.25 6.208 11.25 8C11.25 9.792 9.792 11.25 8 11.25ZM8 6.25C7.035 6.25 6.25 7.035 6.25 8C6.25 8.965 7.035 9.75 8 9.75C8.965 9.75 9.75 8.965 9.75 8C9.75 7.035 8.965 6.25 8 6.25ZM1.25 19C1.25 20.889 4.749 21.75 8 21.75C11.251 21.75 14.75 20.889 14.75 19C14.75 18.586 14.411 18.25 14 18.25C13.589 18.25 13.255 18.581 13.25 18.991C13.132 19.342 11.36 20.25 8 20.25C4.64 20.25 2.868 19.343 2.75 18.991C2.745 18.581 2.414 18.25 2 18.25C1.586 18.25 1.25 18.586 1.25 19Z" fill="white"/>`;

    // Generate SVG string using INTERNAL dimensions for viewBox and element positioning
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${internalSvgWidth}" height="${internalSvgHeight}" viewBox="0 0 ${internalSvgWidth} ${internalSvgHeight}">
        {/* Background fills the internal viewBox */}
        <rect x="0" y="0" width="${internalSvgWidth}" height="${internalSvgHeight}" rx="${internalSvgHeight / 2}" fill="#022968"/>
        {/* Icon positioned using internal padding */}
        <g transform="translate(${internalPaddingX / 5}, ${internalPaddingY / 1.2}) scale(1.5)">
          {/* Render icon using its internal base size */}
          <svg width="${internalIconWidth}" height="${internalIconHeight}" x="${internalPaddingX - 5}" viewBox="0 0 ${20} ${20}"> ${iconPath} </svg>
        </g>
        {/* Text positioned using internal padding/sizes */}
        <text
          x="${internalPaddingX + 5 + internalIconWidth + internalPaddingX}"
          y="${internalSvgHeight / 2}"
          dy=".3em"
          fill="white"
          font-size="${internalFontSize}"
          font-family="${fontFamily}"
          font-weight="${fontWeight}"
          text-anchor="start">
          ${clinicName.replace(' & ', ' and ')}
        </text>
      </svg>
    `;

    const iconObject = {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString),
      // *** Set scaledSize explicitly to the TARGET dimensions ***
      scaledSize: new window.google.maps.Size(targetScaledWidth, targetScaledHeight),
      // *** Anchor point relative to the TARGET scaledSize ***
      // Center anchor is often easiest when scaling this way:
      anchor: new window.google.maps.Point(targetScaledWidth / 2, targetScaledHeight / 2),
      // Or if you want to anchor bottom-center of where the pin *would be* if scaled:
      // anchor: new window.google.maps.Point((internalPaddingX + internalIconWidth / 2) * (targetScaledWidth / internalSvgWidth), targetScaledHeight), // More complex calculation
    };

    selectedIconCache[clinicName] = iconObject;
    return iconObject;
  };
   

   const defaultSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="45" viewBox="0 0 25 35" fill="none">
        <path d="M22.1589 28.6152C23.0333 28.6152 23.7418 29.3239 23.742 30.1982C23.742 31.3285 23.0535 32.1537 22.3923 32.6748C21.7133 33.2099 20.8285 33.6222 19.8767 33.9395C17.9566 34.5794 15.405 34.9482 12.6589 34.9482C9.9129 34.9482 7.36126 34.5794 5.44117 33.9395C4.48942 33.6222 3.60457 33.2099 2.92555 32.6748C2.26436 32.1537 1.57594 31.3285 1.57594 30.1982C1.57611 29.3239 2.28461 28.6152 3.15895 28.6152C3.98418 28.6152 4.66241 29.2467 4.73609 30.0527C4.76352 30.0828 4.80997 30.128 4.88551 30.1875C5.16792 30.4101 5.67478 30.6798 6.44215 30.9355C7.96035 31.4416 10.1584 31.7822 12.6589 31.7822C15.1595 31.7822 17.3575 31.4416 18.8757 30.9355C19.6431 30.6798 20.15 30.4101 20.4324 30.1875C20.5079 30.128 20.5544 30.0828 20.5818 30.0527C20.6555 29.2467 21.3337 28.6152 22.1589 28.6152ZM12.6599 0.907227C17.4904 0.90728 22.0783 3.84438 23.9949 8.45312C25.7768 12.7383 24.8104 16.3987 22.8093 19.5166C21.157 22.091 18.7381 24.3832 16.5867 26.4219H16.5857L16.5847 26.4229C16.2043 26.7834 15.8324 27.1366 15.4744 27.4814C14.7186 28.2093 13.7092 28.6152 12.6599 28.6152C11.6106 28.6152 10.6012 28.2093 9.84547 27.4814L9.84254 27.4785C9.46359 27.1113 9.06827 26.7353 8.66383 26.3506C6.53523 24.3261 4.14962 22.0567 2.51441 19.5146C0.510835 16.3998 -0.459171 12.7436 1.32496 8.45312C3.24159 3.84433 7.82936 0.907227 12.6599 0.907227ZM12.6589 8.42773C10.0356 8.42774 7.90895 10.5544 7.90895 13.1777C7.90895 15.8011 10.0356 17.9277 12.6589 17.9277C15.2823 17.9277 17.4089 15.8011 17.4089 13.1777C17.4089 10.5544 15.2823 8.42773 12.6589 8.42773Z" fill="#D52128"/>
    </svg>
 `;


  const defaultMarkerIcon = {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(defaultSvg),
    scaledSize: new window.google.maps.Size(60, 40), // Display size
    anchor: new window.google.maps.Point(30, 20),    // Anchor at center
  };


  // --- Marker Click Handler ---
  const handleMarkerClick = (clinicName) => {
    if( clinicName.name == selectedClinc?.name ){
      setSeletecedClinic(undefined)
    }else{
      setSeletecedClinic(clinicName); // Update state with the ID of the clicked clinic
    }
 };

const handleClinicChange = (name: string) => {
  const clinic = LocationsScreens.find(c => c.name === name);
  
  if (clinic) {
    setSeletecedClinic(clinic);
    setMapCenter({ lat: clinic.lat, lng: clinic.lng });
  }
};
//   useEffect(() => {
//     if( !startingClinic ) {setSeletecedClinic(findNearestClinicNameGoogle(LocationsScreens, location, window.google))}
//   }, [location,startingClinic])

//   useEffect(() => {
//     if( location ) {
//       const nearestClinic = findNearestClinicNameGoogle(LocationsScreens, location, window.google)
//       setSeletecedClinic(nearestClinic)
//       const defaultMapCenter = { lat : nearestClinic?.lat, lng : nearestClinic?.lng} 
//       setMapCenter(defaultMapCenter)
//     }
//   }, [location])
  useEffect(() => {
    if( isInitialMount.current && selectedClinc && !startingClinic  ){
      const defaultMapCenter = { lat : selectedClinc?.lat, lng : selectedClinc?.lng} 
      setMapCenter(defaultMapCenter)
      isInitialMount.current = false
    }
  }, [selectedClinc])
  return (
    <section className="w-full h-full ">
      {/* This outer div needs to contain both map and overlay */}
      <div className="max-w-[1440px] w-full px-2 mx-auto  relative"> {/* Added position: relative */}

        {/* The Overlay Card */}
        <MapOverlayCard selectedClinic={selectedClinc} handleMarkerClick={handleClinicChange}/>
        {/* The Google Map */}
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={mapCenter}
          zoom={zoom ? zoom : defaultMapZoom}
          options={{
            styles: lightMapStyles, // Use the new light style here
            disableDefaultUI: false,
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
          
        >
          {/* Render Markers Inside */}
          {LocationsScreens.map((clinic) => {
          
            return (
              <MarkerF
                key={clinic.name}
                position={{ lat: clinic.lat, lng: clinic.lng }}
                icon={defaultMarkerIcon} // Apply the determined icon
                title={clinic.name}
                onClick={() => handleMarkerClick(clinic)} // Set this marker as selected on click
                // Optional: Lower zIndex for non-selected markers if overlap is an issue
              />
            );
          })}
        </GoogleMap>
      </div>
    </section>
  )
}


const DropdownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6l4 4 4-4H4z"/>
    </svg>
);


function MapOverlayCard({ selectedClinic, handleMarkerClick} : { selectedClinic : {id : number, name : string, lat : number, lng : number, address : string, link : string, phone : strin, clinic : string}, handleMarkerClick : (name : string) => void }) {
  //const {location, onSetLocation} = useGeolocation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  //const [open, setOpen] = useState(false);
  const AllowLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              onSetLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
            },
            (error) => {
              onSetLocation({
                latitude: null,
                longitude: null,
                error: error.message,
              });
            },
            {
              enableHighAccuracy: false,
              timeout: 20000,
              maximumAge: 1000,
            }
          );
    
        } else {
          onSetLocation({
            latitude: null,
            longitude: null,
            error: 'Geolocation is not supported by this browser.',
          });
        }
  }
  if( !selectedClinic ) {return null}
  return (
    <div className="absolute left-0 right-0 bottom-0 px-6 pb-6 flex flex-col items-start z-10">
        <div className="flex flex-col items-center w-full translate-y-1/2 z-10">
            <Link href={selectedClinic?.link} target='_blank' className="flex items-center gap-2 bg-[#D52128] text-white font-semibold px-6 py-2 rounded-full shadow-lg mb-2">
            <Star /> Get Direction
            </Link>
        </div>
        <div className="xl:w-[70%] sm:w-[80%] w-full self-center rounded-2xl backdrop-blur-2xl bg-[#222]/60 p-8 space-y-5 text-white shadow-lg">
            <div className="text-3xl font-bold  leading-tight">{selectedClinic?.clinic}</div>
            <div className="flex items-center gap-2 ">
            <Mappin2 fill='#fff' />
            <span className="text-base font-medium opacity-90">{selectedClinic?.address}</span>
            </div>
            <div className="flex items-center gap-2">
            <Phone fill='#fff' />
            <span className="text-base font-medium opacity-90">{selectedClinic?.phone}</span>
            </div>
        </div>
    </div>
  );
}



// function findNearestClinicNameGoogle(clinics, userLocation, google) {
//   // Check if geometry library is loaded
//   if( !userLocation ) {return clinics[0]}
//   if (!google || !google.maps || !google.maps.geometry || !google.maps.geometry.spherical) {
//     console.error("Google Maps API or geometry library not loaded.");
//     return null;
//   }
//   if (!clinics || clinics.length === 0 || !userLocation) {
//     return null; // Handle empty input
//   }

//   let minDistance = Infinity;
//   let nearestClinic = null;

//   // Create LatLng object for user location
//   const userLatLng = new google.maps.LatLng(userLocation.latitude, userLocation.longitude);

//   for (const clinic of clinics) {
//      // Ensure clinic has valid coordinates
//     if (typeof clinic.lat !== 'number' || typeof clinic.lng !== 'number') {
//         console.warn(`Skipping clinic with invalid coordinates: ${clinic.name}`);
//         continue;
//     }
//     // Create LatLng object for clinic location
//     const clinicLatLng = new google.maps.LatLng(clinic.lat, clinic.lng);

//     // Calculate distance using Google Maps library (returns distance in meters)
//     const distance = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, clinicLatLng);

//     if (distance < minDistance) {
//       minDistance = distance;
//       nearestClinic = clinic;
//     }
//   }
//   console.log('Nearest Clinic',nearestClinic)
//   return nearestClinic ? nearestClinic : null;
// }


// /styles/lightMapStyles.js
export const lightMapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];