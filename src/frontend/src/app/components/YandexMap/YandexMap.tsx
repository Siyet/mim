import React, {useState} from 'react';

import './YandexMap.less';

import {Map, Placemark, YMaps} from 'react-yandex-maps';
import {Sidebar} from 'components/Sidebar';
import {Nav} from 'components/Nav';
import {Search} from 'components/Search';
import {ElevatorCard} from 'components/ElevatorCard';

const YandexMap = () => {
  const [zoom, setZoom] = useState(9);
  const [center, setCenter] = useState([55.75, 37.57]);
  const mapState = React.useMemo(() => ({ center, zoom }), [
    zoom, center,
  ]);

  return (
    <YMaps>
      <div>
        <Map className="map" state={mapState}>
          <Sidebar>
            <Nav/>
          </Sidebar>
          <Search callBack={(data) => {setCenter(data); setZoom(zoom => 15);}}/>
          <ElevatorCard/>
        </Map>
      </div>
    </YMaps>
    );
}

export {
  YandexMap,
};
