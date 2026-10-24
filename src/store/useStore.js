import {create} from 'zustand';

const greekCities = [
    {id: 1, CITY: 'Athens', CITY_GREEK: 'Αθήνα', REGION: 'Attica', LATITUDE: 37.9838, LONGITUDE: 23.7275},
    {id: 2, CITY: 'Thessaloniki', CITY_GREEK: 'Θεσσαλονίκη', REGION: 'Central Macedonia', LATITUDE: 40.6401, LONGITUDE: 22.9444},
    {id: 3, CITY: 'Patras', CITY_GREEK: 'Πάτρα', REGION: 'Western Greece', LATITUDE: 38.2466, LONGITUDE: 21.7346},
    {id: 4, CITY: 'Heraklion', CITY_GREEK: 'Ηράκλειο', REGION: 'Crete', LATITUDE: 35.3387, LONGITUDE: 25.1442},
    {id: 5, CITY: 'Larissa', CITY_GREEK: 'Λάρισα', REGION: 'Thessaly', LATITUDE: 39.639, LONGITUDE: 22.4191},
    {id: 6, CITY: 'Volos', CITY_GREEK: 'Βόλος', REGION: 'Thessaly', LATITUDE: 39.362, LONGITUDE: 22.942},
    {id: 7, CITY: 'Ioannina', CITY_GREEK: 'Ιωάννινα', REGION: 'Epirus', LATITUDE: 39.665, LONGITUDE: 20.8537},
    {id: 8, CITY: 'Chania', CITY_GREEK: 'Χανιά', REGION: 'Crete', LATITUDE: 35.5138, LONGITUDE: 24.018},
    {id: 9, CITY: 'Rhodes', CITY_GREEK: 'Ρόδος', REGION: 'South Aegean', LATITUDE: 36.4341, LONGITUDE: 28.2176},
    {id: 10, CITY: 'Kavala', CITY_GREEK: 'Καβάλα', REGION: 'Eastern Macedonia and Thrace', LATITUDE: 40.9396, LONGITUDE: 24.4069},
    {id: 11, CITY: 'Kalamata', CITY_GREEK: 'Καλαμάτα', REGION: 'Peloponnese', LATITUDE: 37.0389, LONGITUDE: 22.1142},
    {id: 12, CITY: 'Xanthi', CITY_GREEK: 'Ξάνθη', REGION: 'Eastern Macedonia and Thrace', LATITUDE: 41.1349, LONGITUDE: 24.888},
    {id: 13, CITY: 'Komotini', CITY_GREEK: 'Κομοτηνή', REGION: 'Eastern Macedonia and Thrace', LATITUDE: 41.1192, LONGITUDE: 25.4053},
    {id: 14, CITY: 'Serres', CITY_GREEK: 'Σέρρες', REGION: 'Central Macedonia', LATITUDE: 41.0909, LONGITUDE: 23.5413},
    {id: 15, CITY: 'Tripoli', CITY_GREEK: 'Τρίπολη', REGION: 'Peloponnese', LATITUDE: 37.5089, LONGITUDE: 22.3794},
    {id: 16, CITY: 'Corfu', CITY_GREEK: 'Κέρκυρα', REGION: 'Ionian Islands', LATITUDE: 39.6243, LONGITUDE: 19.9217},
    {id: 17, CITY: 'Mytilene', CITY_GREEK: 'Μυτιλήνη', REGION: 'North Aegean', LATITUDE: 39.1067, LONGITUDE: 26.555},
    {id: 18, CITY: 'Chalkida', CITY_GREEK: 'Χαλκίδα', REGION: 'Central Greece', LATITUDE: 38.4636, LONGITUDE: 23.6028},
    {id: 19, CITY: 'Agrinio', CITY_GREEK: 'Αγρίνιο', REGION: 'Western Greece', LATITUDE: 38.6214, LONGITUDE: 21.4078},
    {id: 20, CITY: 'Alexandroupoli', CITY_GREEK: 'Αλεξανδρούπολη', REGION: 'Eastern Macedonia and Thrace', LATITUDE: 40.8457, LONGITUDE: 25.8739},
];

const greekCitiesGeoJSON = {
    type: 'FeatureCollection',
    features: greekCities.map((city) => ({
        type: 'Feature',
        properties: city,
        geometry: {
            type: 'Point',
            coordinates: [city.LONGITUDE, city.LATITUDE],
        },
    })),
};

const useStore = create((set, get) => ({
    defaultCenter: [39.0742, 21.8243],
    mapCenter: [39.0742, 21.8243],
    setMapCenter: (newCenter) => set({mapCenter: newCenter}),

    userLocation: null,
    setUserLocation: (location) => {
        set(() => ({userLocation: location ? [...location] : null})); // Ensure a new array reference
    },

    currentView: 'map',
    toggleView: () =>
        set((state) => ({
            currentView: state.currentView === 'map' ? 'dashboard' : 'map',
        })),

    isTableCollapsed: true,
    toggleTable: () => set((state) => ({isTableCollapsed: !state.isTableCollapsed})),

    aboutOpen: false, // State for dialog

    geojsonData: greekCitiesGeoJSON,
    bounds: null,
    setBounds: (bounds) => set({bounds}),

    // Layer visibility state
    layers: {
        'greece-cities': {
            id: 'greece-cities',
            name: 'Greek Cities',
            visible: true,
            data: greekCitiesGeoJSON,
        }
    },
    
    toggleLayerVisibility: (layerId) => set((state) => ({
        layers: {
            ...state.layers,
            [layerId]: {
                ...state.layers[layerId],
                visible: !state.layers[layerId].visible,
            }
        }
    })),

    filters: {
        city: [],
        region: [],
    },
    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
    })),
    resetFilters: () => set({
        filters: {
            city: [],
            region: [],
        }
    }),

    // Computed getter for filtered GeoJSON data
    getFilteredGeoJSONData: () => {
        const state = get();
        const { geojsonData, filters } = state;
        
        if (!geojsonData || !geojsonData.features) return geojsonData;
        
        const filteredFeatures = geojsonData.features.filter(feature => {
            const props = feature.properties;
            
            if (filters.city.length > 0 && !filters.city.includes(props.CITY)) {
                return false;
            }

            if (filters.region.length > 0 && !filters.region.includes(props.REGION)) {
                return false;
            }

            return true;
        });
        
        return {
            ...geojsonData,
            features: filteredFeatures
        };
    },

    getUniqueCities: () => {
        const state = get();
        if (!state.geojsonData?.features) return [];

        const cities = state.geojsonData.features
            .map(feature => feature.properties.CITY)
            .filter(Boolean);

        return [...new Set(cities)].sort();
    },

    getUniqueRegions: () => {
        const state = get();
        if (!state.geojsonData?.features) return [];

        const regions = state.geojsonData.features
            .map(feature => feature.properties.REGION)
            .filter(Boolean);

        return [...new Set(regions)].sort();
    },

    snackbar: {
        open: false,
        message: '',
        severity: 'success',
    },
    showSnackbar: (message, severity = 'success') =>
        set({
            snackbar: {open: true, message, severity},
        }),
    hideSnackbar: () =>
        set((state) => ({
            snackbar: {...state.snackbar, open: false},
        })),
}));

export default useStore;
