import { useRef, ReactElement, Dispatch, SetStateAction } from 'react';
import { GoogleMap, Marker, MarkerClusterer, LoadScriptNext } from '@react-google-maps/api';

import { IPost } from '@/pages/map';

import { auth } from '../../../firebase/config';

import { photoStatus, IMarker } from '@/pages/map';

import { getCurrentPost } from '@/firebase/firestore'; 

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
  activePost: IPost | null,
  setActivePost: Dispatch<SetStateAction<IPost | null>>,
  newPost: IPost | null,
  setNewPost: Dispatch<SetStateAction<IPost | null>>,
  setIsPopupForNotVerifiedUsersOpen: Dispatch<SetStateAction<boolean>>,
  setPhotoStatus: Dispatch<SetStateAction<photoStatus>>,
  markers: IMarker[],
  newMarker: IMarker | null,
  setNewMarker: Dispatch<SetStateAction<IMarker | null>>,
}

const MapComponent: React.FC<MapProps> = (
  {
    activePost,
    setActivePost,
    setNewPost,
    setIsPopupForNotVerifiedUsersOpen,
    setPhotoStatus,
    markers,
    newMarker,
    setNewMarker,
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
      setIsPopupForNotVerifiedUsersOpen(true);
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
    
        const newPost: IPost = {
          title: '',
          comment: '',
          imageUrl: undefined,
          owner: auth.currentUser?.uid
        }

      if (!Boolean(activePost)) {
        setNewMarker({ coordinates });
        setNewPost(newPost);
      }
    }
  }

  // ? функция нажатия на маркер. когда мы нажимаем на маркер, открывается привязанный к нему пост. если до этого был открыт другой пост, он закрывается

  const showMarkerDetails = (currentPost: IPost | undefined, marker: IMarker, delay?: number) => {
    if (!Boolean(currentPost)) {
      setActivePost(null);
    }
    else {
      if (delay) {
        setTimeout(() => setActivePost({
          title: currentPost?.title || '',
          comment: currentPost?.comment || '',
          imageUrl: currentPost?.imageUrl || '',
          id: marker.id,
          owner: currentPost?.owner
        }), delay);
      }
      else {
        setActivePost({
          title: currentPost?.title || '',
          comment: currentPost?.comment || '',
          imageUrl: currentPost?.imageUrl || '',
          id: marker.id,
          owner: currentPost?.owner
        });
      }
    }
  }

  const handleMarkerClick = async (event: google.maps.MapMouseEvent, marker: IMarker): Promise<void> => {
    setIsPopupForNotVerifiedUsersOpen(false);
    setPhotoStatus('loading');
    // ? строчки выше - это то, что выполняется в любом случае
    // ? фетч ниже выполняется тоже в любом случае

    // todo щас открывается все только когда каррентпост зафетчится, поэтому есть лаг. стоит, видимо, показывать лоадер, пока он грузится

    const currentPost: IPost | undefined = await getCurrentPost(marker);

    if (Boolean(activePost)) {
      event.stop();
      showMarkerDetails(currentPost, marker, 300);
      console.log('handleMarkerClick if');
    }
    else {
      showMarkerDetails(currentPost, marker);
      console.log('handleMarkerClick else');
    }
  }

  // ? рендеринг маркеров из стейта страницы coordinates - массива маркеров + новый маркер, который создается по клику на карту, если он есть. новый маркер на данном этапе не заносится в массив coordinates

  const coordsWithNewCoords = [...markers, newMarker];

  return (
    <div className="relative h-[1000px] w-full sm:mt-[-20px] md:mt-0 mt-[-70px] hover:cursor-default">
      <LoadScriptNext googleMapsApiKey="AIzaSyD4_JfTWssNSFo6OASVhSpaKJ-0od5TkKQ">
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
                {coordsWithNewCoords.map((marker, index) => {
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
      </LoadScriptNext >
    </div>
  );
}

export default MapComponent;