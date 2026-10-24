import { useEffect } from 'react';
import {
    MapContainer,
    TileLayer,
    LayersControl,
    useMap,
    Marker,
    CircleMarker,
    Tooltip,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../src/App.css';
import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import useStore from '../src/store/useStore';

const gpsLocationIcon = L.divIcon({
    className: 'gps-location-icon',
    iconSize: [16, 16],
    html: `<div class="gps-marker"></div>`,
});

function BoundsUpdater() {
  const map = useMap()
  const bounds = useStore(state => state.bounds)

  useEffect(() => {
    if (bounds) {
        map.fitBounds(bounds)
    }
  }, [map, bounds])

  return null
}

function HomeButton() {
    const map = useMap();
    const defaultCenter = useStore((state) => state.defaultCenter);
    const setBounds = useStore((state) => state.setBounds);

    const handleHomeClick = () => {
        setBounds(null);
        map.setView(defaultCenter, 7);
    };

    return (
        <IconButton
            onClick={handleHomeClick}
            sx={{
                position: 'absolute',
                top: 85,
                left: 9,
                zIndex: 1000,
                width: '36px',
                height: '36px',
                padding: '4px',
                backgroundColor: 'white',
                border: 'grey 1px solid',
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                },
            }}
        >
            <HomeIcon />
        </IconButton>
    );
}

function GpsButton() {
    const map = useMap();
    const setUserLocation = useStore((state) => state.setUserLocation);

    const handleGpsClick = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    map.setView([latitude, longitude], 14);
                    setUserLocation([latitude, longitude]);
                },
                (error) => {
                    console.error('Error fetching GPS location:', error);
                    alert('Unable to retrieve your location.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    return (
        <IconButton
            onClick={handleGpsClick}
            sx={{
                position: 'absolute',
                top: 130,
                left: 9,
                zIndex: 1000,
                width: '36px',
                height: '36px',
                padding: '4px',
                backgroundColor: 'white',
                border: 'grey 1px solid',
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                },
            }}
        >
            <GpsFixedIcon />
        </IconButton>
    );
}

function MapUpdater() {
    const map = useMap();
    const mapCenter = useStore((state) => state.mapCenter);

    useEffect(() => {
        if (mapCenter) {
            map.setView(mapCenter); // Update the map view dynamically
        }
    }, [mapCenter, map]);

    return null;
}

function MapView() {
    const { BaseLayer } = LayersControl;
    const mapCenter = useStore((state) => state.mapCenter);
    const userLocation = useStore((state) => state.userLocation);
    const layers = useStore((state) => state.layers);
    const getFilteredGeoJSONData = useStore((state) => state.getFilteredGeoJSONData);
    const cities = getFilteredGeoJSONData()?.features ?? [];

    return (
        <Box sx={{ flex: 1, position: 'relative' }}>
            <MapContainer
                center={mapCenter}
                zoom={7}
                style={{ height: '100%', width: '100%' }}
            >
                <HomeButton />
                <GpsButton />
                <MapUpdater />
                <BoundsUpdater/>
                {userLocation && (
                    <Marker key={userLocation.toString()} position={userLocation} icon={gpsLocationIcon} />
                )}
                
                {layers['greece-cities']?.visible && cities.map(({ properties }) => (
                    <CircleMarker
                        key={properties.id}
                        center={[properties.LATITUDE, properties.LONGITUDE]}
                        radius={7}
                        pathOptions={{
                            color: '#0d47a1',
                            fillColor: '#1976d2',
                            fillOpacity: 0.9,
                            weight: 2,
                        }}
                    >
                        <Tooltip direction="top" permanent offset={[0, -7]}>
                            {properties.CITY} ({properties.CITY_GREEK})
                        </Tooltip>
                    </CircleMarker>
                ))}
                {/* Layers Control */}
                <LayersControl
                    style={{
                        top: '20px',
                        position: 'absolute',
                        zIndex: 1001,
                    }}
                >
                    {/* Base Layers */}
                    <BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                    </BaseLayer>
                    <BaseLayer name="OpenTopoMap">
                        <TileLayer
                            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenTopoMap contributors"
                        />
                    </BaseLayer>
                    <BaseLayer name="ESRI World Imagery">
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution="&copy; ESRI"
                        />
                    </BaseLayer>
                </LayersControl>
            </MapContainer>
        </Box>
    );
}

export default MapView;
