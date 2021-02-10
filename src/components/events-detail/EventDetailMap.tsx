import React from 'react';
import { Coords } from '../../actions/event';
import GoogleMapReact from 'google-map-react';
import { Segment, Icon } from 'semantic-ui-react';

interface MapProps {
  center: Coords;
  zoom: number;
  heigth: number;
  width: string;
}

export const Marker: React.FC<Coords> = ({ lat, lng }): JSX.Element => {
  return <Icon name='marker' size='big' color='red' lat={lat} lng={lng} />;
};

const EventDetailMap: React.FC<MapProps> = ({
  center,
  zoom,
  heigth,
  width,
}): JSX.Element => {
  return (
    <Segment attached='bottom' style={{ padding: 0 }}>
      <div style={{ height: heigth, width: width }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY! }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker lat={center.lat} lng={center.lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export { EventDetailMap };
