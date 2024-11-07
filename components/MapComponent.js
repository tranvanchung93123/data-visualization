import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import geoData from '../public/data/ariadne_office_geojson.json';

const MapComponent = () => {
  const mapRef = useRef(null); // Use a ref to store the map instance

  useEffect(() => {
    if (mapRef.current === null) {
      // Only initialize the map if it hasn't been already
      mapRef.current = L.map('map', {
        center: [48.115868, 11.589464],
        zoom: 18,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
          })
        ]
      });

      // Add GeoJSON data to the map
      L.geoJSON(geoData, {
        style: { color: '#4a83ec', weight: 2 },
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
          }
        }
      }).addTo(mapRef.current);
    }

    return () => {
      // Clean up on component unmount
      if (mapRef.current !== null) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default MapComponent;
