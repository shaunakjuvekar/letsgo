import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import { useEffect } from 'react';

const Map = ({ data })  => {

    console.log("The data is "+data.latitude);
  const [viewport, setViewport] = useState({
    latitude: 37.2296,
    longitude: -80.4139,
    zoom: 11,
    width: '100%',
    height: '400px',
  });

  const [marker, setMarker] = useState({
    latitude: 37.3536,
    longitude: -80.5994,
  });

  useEffect(() => {
    // Add a conditional check for data before accessing its properties
    if (data && data.latitude && data.longitude) {
      setMarker({
        latitude: data.latitude,
        longitude: data.longitude,
      });
      setViewport({
        latitude: data.latitude,
        longitude: data.longitude,
        zoom: 11,
    width: '100%',
    height: '400px',
      })
    }
  }, [data]);

  const handleZoomIn = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.min(prevViewport.zoom + 1, 20),
    }));
  };

  const handleZoomOut = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.max(prevViewport.zoom - 1, 1),
    }));
  };

  return (
    <div>
      <div style={{ height: '285px', width: '100%' }}>
        <ReactMapGl
          {...viewport}
          mapboxAccessToken="pk.eyJ1IjoicnJhbW5hdGgiLCJhIjoiY2xvcDJtODgzMDQ0ZTJrbjBhaWoyZDM3ZyJ9.cZSZsH_sovNUi-sk6glRWg"
          mapStyle="mapbox://styles/rramnath/clop5wooe00d701qsbnrjd3cw"
       
        >
          <Marker latitude={marker.latitude} longitude={marker.longitude}>
            <div style={{fontSize:"20px", color:"red"}}><i class="fa-solid fa-location-dot"></i></div>
          </Marker>
        </ReactMapGl>
      </div>
      <div>
        <button style={{marginRight:"15px"}} onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
    </div>
  );
};

Map.propTypes = {
    data: PropTypes.array.isRequired, // Add prop type validation for 'data'
  };

export default Map;
