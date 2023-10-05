import React, { useRef, useEffect, useState } from 'react'
import '../styles/Sizing.css'
import "../styles/Map.css"
import mapboxgl from "mapbox-gl";
import features from './trees.json';
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXN3YXRoaXMwNyIsImEiOiJjbG1pcG5nbjcwc3NiM2xuc3dmZHc4bHhxIn0.Sjxf7YoCzfBIm7t0zbnFnQ";

const Map = ({ cen, setCen }) => {

  const mapContainerRef = useRef(null);


  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: cen,
      zoom: 5
    });
    map.on('load', () => {
      map.addSource('hotspot', {
      'type': 'geojson',
     'data':features
      });
      map.addLayer({
        "id": "add-locations",
        "type": "circle",
        "source": "hotspot", // Assuming your GeoJSON data source is named 'hotspot'
        "paint": {
          "circle-color": [
            "match",
            ["get", "Borough"], // Assuming "Location" is a property in your GeoJSON with location identifiers
            "BK", "#FF5733", // Specify the color for Location1
            "MN", "#3498DB", // Specify the color for Location2
            "BX", "#8E44AD", // Specify the color for Location3
            "QU", "#F1C40F", // Specify the color for Location4
            "SI", "#27AE60", // Specify the color for Location5
            // Add more matches for other locations and colors as needed
            "#44AB80" // Default color if there's no match
          ],
          "circle-radius": 8, // Adjust the radius as needed
          "circle-opacity": 0.7
        }
      });
         });
          console.log(JSON.stringify(features.features[0].properties.Borough))
       
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, [cen]);


  return <div className="map-container mainsize" ref={mapContainerRef} />;
};

export default Map;

