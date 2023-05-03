import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, OverlayView } from '@react-google-maps/api';
import PostOnMap from './postOnMap/PostOnMap';
import MarkerAndPostOnMap from './MarkerAndPostOnMap';

const containerStyle = {
  width: '100%',
  height: '1000px',
  zIndex: 1
}

export interface Coordinates {
  lat: number,
  lng: number,
}

interface MapComponentState {
  coordinates: Coordinates,
  isPostOnMapOpen: boolean,
}

const center: Coordinates = {
  lat: -8.4095,
  lng: 115.1889,
};

function MapComponent() {
  // todo поменять стейт компонента с картой. с нем должен лежать не только массив с координатами для каждого маркера, но и тру/фолс, определяющий, открыт ли прикрепленный к определенному маркеру попап - done

  // todo поменять интерфейсы, соответственно, прокинуть необходимое пропсами в маркер и попап, там использоваеть пропсы, а не собственный стейт - done

  // todo поменять функцию, которая отвечает за клик по карте. открытый попап по клику по карте должен закрываться. маркеры пока должны ставиться по клику на карту, потом эта логика перекочует в обработчик клика по кнопке опубликовать фото

  // todo сделать так, чтобы при клике по другому маркеру не только открывался попап, прикрепленный к новому маркеру, но и закрывался открытый ранее попап. возможно, для этого потребуется отдельная функция. или изменение в текущую функцию открытия попапа, чтобы все попапы, кроме текущего, закрывались - done

  const [markers, setMarkers] = useState<MapComponentState[]>([{
    coordinates: {
      lat: 0,
      lng: 0,
    },
    isPostOnMapOpen: false,
  }]);

  // ? здесь по клику на карту создается маркер с координатами клика и isPostOnMapOpen, по дефолту установленным в false. затем обновляется стейт компонента гугл-карт - массив дополняется новым значением
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const newMarker: MapComponentState = {
      coordinates: {
        lat: event.latLng?.lat() ?? 0,
        lng: event.latLng?.lng() ?? 0,
      },
      isPostOnMapOpen: false,
    }

    setMarkers((prevMarkers: MapComponentState[]) => {
      const updatedMarkers = prevMarkers.map(prevmarker => {
        return { ...prevmarker, isPostOnMapOpen: false }
      });

      return [...updatedMarkers, newMarker];
    });
  }

  // ? функция нажатия на маркер. когда мы нажимаем на маркер, открывается привязанный к нему пост. если до этого был открыт другой пост, он закрывается
  const handleMarkerClick = (index: number): void => {
    setMarkers((prevMarkers: MapComponentState[]) => 
      prevMarkers.map((prevMarker, prevIndex) => 
        prevIndex === index
          ?
          { ...prevMarker, isPostOnMapOpen: !prevMarker.isPostOnMapOpen }
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
          {markers.map((marker, index) => {
            return (
              <MarkerAndPostOnMap
                key={index}
                marker={marker.coordinates}
                isPostOnMapOpen={marker.isPostOnMapOpen}
                onMarkerClick={() => handleMarkerClick(index)}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapComponent;
