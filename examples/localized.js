var map = L.map('map');

L.tileLayer('http://6ddruqfql8.lb.c1.gra7.k8s.ovh.net/tile/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var control = L.Routing.control(L.extend(window.lrmConfig, {
	waypoints: [
		L.latLng(6.148611288965125, 1.2628816526246611),
		L.latLng(6.145011014220201, 1.2405515781536414)
	],
    language: 'de',
	geocoder: L.Control.Geocoder.nominatim(),
    routeWhileDragging: true,
    reverseWaypoints: true,
    showAlternatives: true,
    altLineOptions: {
        styles: [
            {color: 'black', opacity: 0.15, weight: 9},
            {color: 'white', opacity: 0.8, weight: 6},
            {color: 'blue', opacity: 0.5, weight: 2}
        ]
    }
})).addTo(map);

L.Routing.errorControl(control).addTo(map);
