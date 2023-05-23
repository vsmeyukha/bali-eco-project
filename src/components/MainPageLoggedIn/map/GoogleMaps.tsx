import { useState, useRef, ReactElement } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import SmallPostOnMap from './postOnMap/SmallPostOnMap';

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

// ? на всяк пусть тут полежит тайпинг гугловый google.maps.Point

interface MapComponentState {
  coordinates: Coordinates,
  isPostOnMapOpen: boolean,
  isBigPostOpen: boolean,
  popupPosition?: CoordsConvertedToPixels,
}

const center: Coordinates = {
  lat: -8.4095,
  lng: 115.1889,
};

const markerIconSVG = {
  url: '/images/svgs/icons/marker.svg',
}

interface MapProps {
  handleBigPopupOpen: () => void,
}

const MapComponent: React.FC<MapProps> = ({handleBigPopupOpen}):ReactElement => {
  // ? создаем реф карты, пока пустой
  const mapRef = useRef<GoogleMapsInstance | null>(null);

  // ? в этом методе сохраняем в реф инстанс класса гугл карт, потом при рендеринге передадим в проп onLoad карты
  const handleMapLoad = (mapInstance: GoogleMapsInstance): void => {
    mapRef.current = mapInstance;
  }

  // ? создаем стейт компонента. в стейте лежит массив объектов, в каждом объекте - координаты маркера и булевое значение, показывающее, открыт ли попап
  const [markers, setMarkers] = useState<MapComponentState[]>([{
    coordinates: {
      lat: 0,
      lng: 0,
    },
    isPostOnMapOpen: false,
    isBigPostOpen: false,
  }]);

  // ? здесь по клику на карту создается маркер с координатами клика и isPostOnMapOpen, по дефолту установленным в false. затем обновляется стейт компонента гугл-карт - массив дополняется новым значением
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const newMarker: MapComponentState = {
      coordinates: {
        lat: event.latLng?.lat() ?? 0,
        lng: event.latLng?.lng() ?? 0,
      },
      isPostOnMapOpen: false,
      isBigPostOpen: false,
    }

    setMarkers((prevMarkers: MapComponentState[]) => {
      // ? также закрываем все попапы по клику на карту, если какой-то попап был открыт
      const updatedMarkers = prevMarkers.map(prevmarker => {
        return { ...prevmarker, isPostOnMapOpen: false }
      });

      return [...updatedMarkers, newMarker];
    });
  }

  // ? функция нажатия на маркер. когда мы нажимаем на маркер, открывается привязанный к нему пост. если до этого был открыт другой пост, он закрывается
  const handleMarkerClick = (index: number): void => {
    // ? переводим координаты маркера в пиксели
    // ? вызываем метод getProjection инстанса карты, получаем проекцию, которая является объектом
    // ? у этого объекта есть метод fromLatLngToPoint, который принимает объект LatLng с координатами по широте и долготе
    // ? метод fromLatLngToPoint возвращает объект с координатами по оси х и оси у в пикселях
    // ? возвращенный объект записываем в стейт чуть ниже
    const popupPosition = mapRef.current?.getProjection()?.fromLatLngToPoint(markers[index].coordinates);
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
    

    setMarkers((prevMarkers: MapComponentState[]) => 
      prevMarkers.map((prevMarker: MapComponentState, prevIndex: number) => 
        prevIndex === index
          ?
          {
            ...prevMarker,
            isPostOnMapOpen: !prevMarker.isPostOnMapOpen,
            popupPosition: localPosition,
          }
          :
          { ...prevMarker, isPostOnMapOpen: false }
      )
    )
  }

  // ? удаление маркера и соответственно привязанного к нему поста. пока этим мы не пользуемся, но это будет работать по кнопке "удалить" в посте, этой кнопки пока нет
  const removeMarker = (event: google.maps.MapMouseEvent) => {
    const markersWithoutSelectedMarker = markers.filter(marker => {
      if (marker.coordinates.lat !== event.latLng?.lat() && marker.coordinates.lng !== event.latLng?.lng()) {
        return marker;
      }
    });
    setMarkers(markersWithoutSelectedMarker);
  }

  const handleSmallPostClick = (): void => {
    handleBigPopupOpen();
    
    const allSmallPopupsClosed: MapComponentState[] = markers.map(prevMarker => {
      prevMarker.isPostOnMapOpen = false;
      return prevMarker;
    });

    setMarkers(allSmallPopupsClosed);
  }

  return (
    <div className="relative h-[1000px] w-full">
      <LoadScript googleMapsApiKey="AIzaSyD4_JfTWssNSFo6OASVhSpaKJ-0od5TkKQ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
          onLoad={handleMapLoad}
        >
          {/* Additional map components, like markers or overlays, can be added as children here */}
          {markers.map((marker, index) => {
            return (
              <Marker key={index} position={marker.coordinates} onClick={() => handleMarkerClick(index)} icon={markerIconSVG} />
            );
          })}
        </GoogleMap>
      </LoadScript>
      {markers.map((marker, index) => {
          return (
            <SmallPostOnMap
              key={index}
              position={marker.popupPosition}
              isPostOnMapOpen={marker.isPostOnMapOpen}
              onClick={handleSmallPostClick}
            />
          )
      })}
    </div>
  );
}

export default MapComponent;

// ? два возможных варианта решения проблемы с попапом. первый - как говорит электротетя, используя useRef, создавая реф карты, получая координаты маркера и переводя их в пиксели, далее рендерим абсолютно спозиционированный попап. но если идет перерисовка и у нас в итоге не один узкий попап, а маленький попап и большой попап, открывающийся по клику на маленький, то, возможно, есть смысл не заморачиваться с useRef и всем остальным, а маленький попап оставить внутри карты. и посмотреть, будет ли много кейсов, когда его отображению мешает волна сверху иил что-то еще. а большой попап рендерится вне карты, но в том же компоненте, просто лежит снизу. например, так. 