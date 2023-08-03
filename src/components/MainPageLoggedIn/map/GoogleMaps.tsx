import { useRef, ReactElement, Dispatch, SetStateAction, RefObject, MouseEvent } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import shortid from 'shortid';

import { IMarker } from '@/pages/map';

import { auth } from '../../../firebase/config';

import { photoStatus } from '@/pages/map';

type GoogleMapsInstance = google.maps.Map;

const containerStyle = {
  width: '100%',
  height: '1000px',
  zIndex: 1,
}

export interface Coordinates {
  lat: number,
  lng: number,
}

export interface CoordsConvertedToPixels {
  x: number,
  y: number,
}

const center: Coordinates = {
  lat: -8.4095,
  lng: 115.1889,
};

const markerIconSVG = {
  url: '/images/svgs/icons/marker.svg',
}

interface MapProps {
  markers: IMarker[],
  activeMarker: IMarker | null,
  setActiveMarker: Dispatch<SetStateAction<IMarker | null>>,
  newMarker: IMarker | null,
  setNewMarker: Dispatch<SetStateAction<IMarker | null>>,
  setNotVerifiedPopupOpen: Dispatch<SetStateAction<boolean>>,
  setIsMarkerClicked: Dispatch<SetStateAction<boolean>>,
  setPhotoStatus: Dispatch<SetStateAction<photoStatus>>
}

const MapComponent: React.FC<MapProps> = (
  {
    markers,
    activeMarker,
    setActiveMarker,
    newMarker,
    setNewMarker,
    setNotVerifiedPopupOpen,
    setIsMarkerClicked,
    setPhotoStatus
  }
): ReactElement => {

  // ? создаем реф карты, пока пустой
  const mapRef = useRef<GoogleMapsInstance | null>(null);

  // ? в этом методе сохраняем в реф инстанс класса гугл карт, потом при рендеринге передадим в проп onLoad карты
  const handleMapLoad = (mapInstance: GoogleMapsInstance): void => {
    mapRef.current = mapInstance;
  }

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    console.log('handleMapClick');

    if (auth.currentUser?.emailVerified === false) {
      if (Boolean(activeMarker)) {
        // return;
      }
      setNotVerifiedPopupOpen(true);
    }
    else {
      if (Boolean(activeMarker)) {
        // return;
      }
      else {
        const coordinates = {
          lat: event.latLng?.lat() ?? 0,
          lng: event.latLng?.lng() ?? 0,
        }
    
        // ? переводим координаты маркера в пиксели
        // ? вызываем метод getProjection инстанса карты, получаем проекцию, которая является объектом
        // ? у этого объекта есть метод fromLatLngToPoint, который принимает объект LatLng с координатами по широте и долготе
        // ? метод fromLatLngToPoint возвращает объект с координатами по оси х и оси у в пикселях
        // ? возвращенный объект записываем в стейт чуть ниже
        const popupPosition = mapRef.current?.getProjection()?.fromLatLngToPoint(coordinates);
        // ? получаем масштаб карты
        const bounds = mapRef.current?.getBounds();
        const topLeftLatLng = bounds ? new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getSouthWest().lng()) : null;
        const topLeftPixel = topLeftLatLng ? mapRef.current?.getProjection()?.fromLatLngToPoint(topLeftLatLng) : null;

        // ? проверяем, что в popupPosition не лежит null, иначе ts ругается
        if (!popupPosition || !topLeftPixel) return;
    
        const zoom = mapRef.current?.getZoom();
        const scale = Math.pow(2, zoom ?? 0);
        const scaledPopupPosition = {
          x: popupPosition.x * scale,
          y: popupPosition.y * scale,
        };
    
        const localPosition = {
          x: Math.floor(scaledPopupPosition.x - topLeftPixel.x * scale),
          y: Math.floor(scaledPopupPosition.y - topLeftPixel.y * scale),
        };
    
        const newMarker: IMarker = {
          coordinates,
          coordsToPixels: localPosition,
          title: '',
          comment: '',
          imageUrl: undefined,
          id: shortid(),
        }

        setNewMarker(newMarker);
      }
    }
  }

  // ? функция нажатия на маркер. когда мы нажимаем на маркер, открывается привязанный к нему пост. если до этого был открыт другой пост, он закрывается
  const handleMarkerClick = (event: google.maps.MapMouseEvent, marker: IMarker): void => {
    setIsMarkerClicked(true);
    setNotVerifiedPopupOpen(false);

    if (Boolean(activeMarker)) {
      event.stop();
      setActiveMarker(null);
      setTimeout(() => setActiveMarker(marker), 300);
      setPhotoStatus('loading');
      console.log('handleMarkerClick if');
    }
    else {
      setActiveMarker(marker);
      console.log('handleMarkerClick else');
    }
  }

  // ? рендеринг маркеров из стейта страницы markers - массива маркеров + новый маркер, который создается по клику на карту, если он есть. новый маркер на данном этапе не заносится в массив markers
  const markersWithNewMarker = [...markers, newMarker];

  return (
    <div className="relative h-[1000px] w-full sm:mt-[-20px] md:mt-0 mt-[-70px] hover:cursor-default">
      <LoadScript googleMapsApiKey="AIzaSyD4_JfTWssNSFo6OASVhSpaKJ-0od5TkKQ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
          onLoad={handleMapLoad}
        >
          <MarkerClusterer>
            {(clusterer) => (
              <>
                {markersWithNewMarker.map((marker, index) => {
                  if (marker !== null) {
                    return (
                      <Marker
                        key={index}
                        position={marker.coordinates}
                        onClick={(event) => handleMarkerClick(event, marker)}
                        icon={markerIconSVG}
                        clusterer={clusterer}
                      />
                    )
                  }
                  return null;
                })}
              </>
            )}
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript >
    </div>
  );
}

export default MapComponent;