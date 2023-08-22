import { useRef, ReactElement, Dispatch, SetStateAction } from 'react';

// ? Importing the necessary infrastructure from the @react-google-maps/api library. An important aspect is to use the LoadScriptNext component, and not just LoadScript, since it is optimized for SR and SSG.
// ? Импортируем необходимую инфраструктуру из библиотеки @react-google-maps/api. Важный аспект - нужно использовать компонент LoadScriptNext, а не просто LoadScript, так как он оптимизирован для SSR и SSG.
import { GoogleMap, Marker, MarkerClusterer, LoadScriptNext } from '@react-google-maps/api';

// ? Import the necessary types from the main page component, where they are described.
// ? Импортируем необходимые типы из компонента главной страницы, где они описаны.
import { IPost, photoStatus, IMarker } from '@/pages/map';

import { auth } from '../../../firebase/config';

import { getCurrentPost } from '@/firebase/firestore'; 

type GoogleMapsInstance = google.maps.Map;

// ? Describing the styles of the map container.
// ? Описываем стили контейнера карты.
const containerStyle = {
  width: '100%',
  height: '1000px',
  zIndex: 1,
}

// ? Coordinate typing. Coordinates are an object with two fields: lat and lng, the value of each is a number.
// ? Типизация координат. Координаты - это объект с двумя полями: lat и lng, значением каждого из которых является число.
export interface Coordinates {
  lat: number,
  lng: number,
}

// ? Typing coordinates converted to pixels. In the previous implementation, CoordsConvertedToPixels were used to display a small popup linked to the marker position on the map.
// ? Типизация координат, конвертированных в пиксели. В предыдущей реализации CoordsConvertedToPixels использовались для отображения малого попапа, привязанного к позиции маркера на карте.
export interface CoordsConvertedToPixels {
  x: number,
  y: number,
}

// ? Coordinates of the center of the map
// ? Координаты центра карты
const center: Coordinates = {
  lat: -8.4095,
  lng: 115.1889,
};

// ? Custom SVG marker icon to make the marker look good on any resolutions
// ? Кастомная SVG-иконка маркера, чтобы маркер выглядел хорошо на любых разрешениях
const markerIconSVG = {
  url: '/images/svgs/icons/marker.svg',
}

// ? Map props typing. All the values passed as props into the map component are described in the comments to the page component.
// ? Типизация пропсов компонента карты. Обо всех значениях, прокинутых пропсами в компонент карты6 рассказано в комментариях к компоненту страницы.
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

  // ? Creating a ref of the map.
  // ? Создаем реф карты.
  const mapRef = useRef<GoogleMapsInstance | null>(null);

  // ? In this method, we save GoogleMapsInstance class to the ref, then when rendering, we will pass it to the map in 'onLoad' prop
  // ? В этом методе сохраняем в реф инстанс класса GoogleMaps, потом при рендеринге передадим его в проп onLoad карты
  const handleMapLoad = (mapInstance: GoogleMapsInstance): void => {
    mapRef.current = mapInstance;
  }

  // ? What happens on map click
  // ? Что происходит при клике на карту
  const handleMapClick = (event: google.maps.MapMouseEvent) => {

    // ? If the user's email is not confirmed, a popup with a warning for users with an unconfirmed email opens.
    // ? Если емэйл пользователя не подтвержден, то открывается попап с предупреждением для пользователей с неподтвержденным емэйлом.
    if (auth.currentUser?.emailVerified === false) {
      setIsPopupForNotVerifiedUsersOpen(true);
    }
    // ? In other case
    // ? В противном случае
    else {
      // ? Coordinates object is created with the click coordinates, which we take from event.LatLng
      // ? создается объект с координатами клика, которые забираем из event.latLng
      const coordinates: Coordinates = {
        lat: event.latLng?.lat() ?? 0,
        lng: event.latLng?.lng() ?? 0,
      }

      // ? The logic of converting coordinates to pixels was used in the previous version of the project, when in addition to a large pop-up, there was also a small one displayed on the map next to the marker.

      // ? Логика конвертации координат в пиксели использовалась в предыдущей версии проекта, когда помимо большого попапа был еще малый, отображавшийся на карте рядом в маркером.

      // ? converting marker coordinates to pixels
      // ? calling the getProjection method of the map instance, we get a projection that is an object
      // ? this object has a fromLatLngToPoint method that accepts a LatLng object with latitude and longitude coordinates
      // ? the fromLatLngToPoint method returns an object with x-axis and y-axis coordinates in pixels

      // ? переводим координаты маркера в пиксели
      // ? вызываем метод getProjection инстанса карты, получаем проекцию, которая является объектом
      // ? у этого объекта есть метод fromLatLngToPoint, который принимает объект LatLng с координатами по широте и долготе
      // ? метод fromLatLngToPoint возвращает объект с координатами по оси х и оси у в пикселях
      // * const popupPosition = mapRef.current?.getProjection()?.fromLatLngToPoint(coordinates);

      // ? getting the map scale
      // ? получаем масштаб карты
      // * const bounds = mapRef.current?.getBounds();

      // ? Determine the top-left corner's geographical coordinates of the currently visible map section.
      // ? If bounds is defined, get the latitude from the northeast corner and longitude from the southwest corner.
      // ? This combination gives the top-left (northwest) corner's latitude and longitude.
      // ? If bounds is not present, set topLeftLatLng to null.

      // ? Определяем географические координаты верхнего левого угла видимого в данный момент раздела карты.
      // ? Если определены границы, получим широту от северо-восточного угла и долготу от юго-западного угла.
      // ? Эта комбинация определяет широту и долготу верхнего левого (северо-западного) угла.
      // ? Если bounds отсутствует, установим для topleftlatlong значение null.
      // * const topLeftLatLng = bounds ? new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getSouthWest().lng()) : null;

      // ? Convert the top-left geographical coordinates to pixel coordinates on the screen.
      // ? If topLeftLatLng is defined:
      // ? - Access the current instance of the Google map.
      // ? - Get the current projection responsible for translating between LatLng and Point.
      // ? - Convert the geographical coordinates to pixel coordinates relative to the top-left corner of the map's div.
      // ? If topLeftLatLng is not present, set topLeftPixel to null.

      // ? Преобразуем географические координаты в верхнем левом углу в пиксельные координаты на экране.
      // ? Если определен параметр topleftlatlong:
      // ? - Получим доступ к текущему экземпляру карты Google.
      // ? - Получим текущую проекцию, ответственную за перевод из LatLng в Point, то есть пикселями.
      // ? - Преобразуем географические координаты в пиксельные координаты относительно верхнего левого угла div карты.
      // ? Если topleftlatlong отсутствует, установим topLeftPixel равным null.
      // * const topLeftPixel = topLeftLatLng ? mapRef.current?.getProjection()?.fromLatLngToPoint(topLeftLatLng) : null;

      // ? check that the popupPosition does not contain null
      // ? проверяем, что в popupPosition не лежит null
      // * if (!popupPosition || !topLeftPixel) return;

      // ? Retrieve the current zoom level of the map.
      // ? Zoom levels dictate the scale of the map, with each zoom level doubling the scale from the previous one.

      // ? Получим текущий уровень масштабирования карты.
      // ? Уровни масштабирования определяют масштаб карты, причем каждый уровень масштабирования удваивает масштаб по сравнению с предыдущим.
      // * const zoom = mapRef.current?.getZoom();
      
      // ? Calculate the current scale of the map based on the zoom level.
      // ? With each increase in zoom level, the scale is doubled (hence the use of 'Math.pow(2, zoom)').
      // ? If the zoom level is not available, default it to 0 (which results in a scale of 1).

      // ? Вычислим текущий масштаб карты на основе уровня масштабирования(zoom).
      // ? С каждым увеличением уровня масштабирования масштаб удваивается (отсюда и использование 'Math.pow(2, zoom)').
      // ? Если уровень масштабирования недоступен, установим его значение равным 0 (что приводит к масштабированию, равному 1).

      // * const scale = Math.pow(2, zoom ?? 0);
      
      // ? Calculate the position of the popup on the map in scaled pixels.
      // ? The 'popupPosition' provides the position in unscaled pixels, so we multiply by the scale to get the position in the current zoom level.

      // ? Вычислим положение попапа на карте в приведенных к масштабу пикселях.
      // ? 'popupPosition' предоставляет положение в немасштабированных пикселях, поэтому мы умножаем их на масштаб, чтобы получить положение при текущем уровне масштабирования.

      // * const scaledPopupPosition: CoordsConvertedToPixels = {
      // *   x: popupPosition.x * scale,
      // *   y: popupPosition.y * scale,
      // * };
      
      // ? Determine the local pixel position of the popup relative to the top-left corner of the visible map section.
      // ? To do this:
      // ? - Subtract the top-left pixel's x and y coordinates (which are scaled to the current zoom level) from the popup's scaled x and y coordinates.
      // ? - The result gives the position of the popup relative to the top-left corner of the visible portion of the map.
      // ? - 'Math.floor' is used to ensure we have whole pixel values.

      // ? Определим локальное положение попапа в пикселях относительно верхнего левого угла видимой части карты.
      // ? Чтобы сделать это:
      // ? - - Вычтем координаты x и y верхнего левого пикселя (которые масштабируются до текущего уровня масштабирования) из всплывающих масштабированных координат x и y.
      // ? - Результат показывает положение всплывающего окна относительно верхнего левого угла видимой части карты.
      // ? - 'Math.floor' используется, чтобы у нас были целочисленные значения пикселей.

      // * const localPosition: CoordsConvertedToPixels = {
      // *   x: Math.floor(scaledPopupPosition.x - topLeftPixel.x * scale),
      // *   y: Math.floor(scaledPopupPosition.y - topLeftPixel.y * scale),
      // * };

      // ? When clicking on the map, we create an empty newPost. This is a blank that will be filled with data that the user will enter in the blank of adding a new post.

      // ? При клике на карту создаем пустой newPost. Это заготовка, которая наполнится данными, которые введет пользователь в заготовке добавления нового поста.
      const newPost: IPost = {
        title: '',
        comment: '',
        imageUrl: undefined,
        owner: auth.currentUser?.uid
      }

      // ? Check if the pop-up with the post is already open (it opens if activePost is not null).
      // ? Проверяем, не открыт ли уже попап с постом (который открывается, если activePost не равен null).
      if (!Boolean(activePost)) {
        // ? If it is not open, then we fill in the coordinates of the click in newMarker. The sidebar for adding a new post opens if newMarker is not null.
        // ? Если не открыт, то в newMarker заливаем координаты клика. Сайдбар добавления нового поста открывается, если newMarker не равен null.
        setNewMarker({ coordinates });

        // ? And we set newPost state as newPost.
        // ? И присваиваем newPost стейту newPost.
        setNewPost(newPost);
      }
    }
  }

  // ? What happens on marker click
  // ? The function takes two arguments - event and the marker itself.

  // ? Что происходит по клику на маркер
  // ? Функция принимает два аргумента - событие и сам маркер.
  const handleMarkerClick = async (event: google.maps.MapMouseEvent, marker: IMarker): Promise<void> => {
    // ? We close the popup with a warning for users with unverified mail. 
    // ? photoStatus is set to 'loading'.

    // ? Закрываем попап с пмредупреждением для пользователей с неверифицированной почтой. 
    // ? photoStatus переводим в статус 'loading'.
    setIsPopupForNotVerifiedUsersOpen(false);
    setPhotoStatus('loading');

    // ? Request a post associated with the marker from firebase.
    // ? Запрашиваем связанный с маркером пост из firebase.
    const currentPost: IPost | undefined = await getCurrentPost(marker);

    // ? If there is an activePost (that is, a pop-up with the post is open), then:
    // ? Если есть activePost (то есть попап с постом открыт), то:
    if (Boolean(activePost)) {
      // ? We stop the event from propagating (in Google maps, this is done using the event.stop() method, which is analogue to the usual event.stopPropagation() method)

      // ? Останавливаем всплытие события (в гугл-картах это делается с помощью метода event.stop(), который является аналогом обычного метода stopPropagation())
      event.stop();

      // ? We call the showMarkerDetails function, passing to it as arguments: the currentPost received from firebase, the clicked marker and 300 milliseconds of delay. 300 milliseconds is the duration of the post closing animation. By passing this value, we keep the UI smooth.

      // ? Вызываем функцию showMarkerDetails, передав в нее аргументами currentPost, полученный из firebase, кликнутый маркер и 300 миллисекунд задержки. 300 миллисекунд - это длительность анимации закрытия поста. Передав это значение, мы сохраняем плавность UI.
      showMarkerDetails(currentPost, marker, 300);
    }
    // ? If there is no activePost, then:
    // ? Если activePost не существует, то:

    else {
      // ? We call the showMarkerDetails function, passing to it as arguments: the currentPost received from firebase and the clicked marker, without delay.

      // ? Вызываем функцию showMarkerDetails, передав в нее аргументами currentPost, полученный из firebase и кликнутый маркер, без задержки.
      showMarkerDetails(currentPost, marker);
    }
  }

  // ? Функция, отвечающая за открытие поста, привязанного к маркеру.
  function showMarkerDetails(currentPost: IPost | undefined, marker: IMarker, delay?: number) {
      // ? Если из firebase пока не пришел currentPost (привязанный к маркеру пост), то:
    if (!Boolean(currentPost)) {
        // ? Задаем activePost значение null, то есть закрываем попап с постом.
        setActivePost(null);
    }
    // ? Если currentPost есть, то:
    else {
      // ? If a delay is passed as an argument, then we call the activePost setter and assign all activePost fields the corresponding currentPost fields inside setTimeout after the delay. Thus, the open pop-up has time to close smoothly.

      // ? Если аргументом передана задержка, то мы вызываем сеттер activePost и присваиваем всем полям activePost соответствующие поля currentPost внутри setTimeout спустя задержку. Таким образом, открытый попап успевает плавно закрыться.
        if (delay) {
          setTimeout(() => setActivePost({
            title: currentPost?.title || '',
            comment: currentPost?.comment || '',
            imageUrl: currentPost?.imageUrl || '',
            id: marker.id,
            owner: currentPost?.owner
          }), delay);
        }
      // ? If the delay is not passed, then just call the activePost setter.
      // ? Если задержка не передана, то просто вызываем сеттер activePost. 
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

  // ? Rendering markers from the markers state of the page plus a new marker that is created by clicking on the map, if there is one. The new marker is not written into the markers state at this stage.

  // ? Рендеринг маркеров из стейта страницы markers - массива маркеров + новый маркер, который создается по клику на карту, если он есть. Новый маркер на данном этапе не заносится в массив markers.

  const coordsWithNewCoords = [...markers, newMarker];

  return (
    <div className="relative h-[1000px] w-full sm:mt-[-20px] md:mt-0 mt-[-70px] hover:cursor-default">
      <LoadScriptNext googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
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