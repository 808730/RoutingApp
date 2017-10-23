

mapboxgl.accessToken = 'pk.eyJ1IjoiODA4NzMwIiwiYSI6IjY0OW5LS0EifQ.o5wFCjlclI77_eXP7lIWLA';
var MapboxMap = new mapboxgl.Map({
    container: 'MapboxMap',
    style: 'mapbox://styles/808730/cj901eprujfe92rnrapm3qdie',
	
	zoom: 9,
	center: [13.41598, 52.51710],
	refreshExpiredTiles: false, 
	attributionControl: false,
	trackResize: true,
	preserveDrawingBuffer: true
	
});

MapboxMap.on('load', function() {

	var layers = MapboxMap.getStyle().layers.reverse();
    var labelLayerIdx = layers.findIndex(function (layer) {
        return layer.type !== 'symbol';
    });
    var labelLayerId = labelLayerIdx !== -1 ? layers[labelLayerIdx].id : undefined;
    MapboxMap.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 16,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': {
                'type': 'identity',
                'property': 'height'
            },
            'fill-extrusion-base': {
                'type': 'identity',
                'property': 'min_height'
            },
            'fill-extrusion-opacity': .9
        }
    }, labelLayerId);
});

MapboxMap.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'radial'
}));

MapboxMap.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));

MapboxMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

MapboxMap.addControl(new MapboxDirections({
    accessToken: mapboxgl.accessToken
}), 'top-left');

MapboxMap.addControl(new mapboxgl.AttributionControl({
        compact: true
    }));
	
MapboxMap.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));