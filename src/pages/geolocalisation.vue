<template>

  <q-page padding class="flex">
    <!-- content --> 
<q-card style="flex:1">
  <div>GPS position: <strong>{{ position }}</strong></div>
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="markerLatLng" ></l-marker>
      </l-map>
      <!-- Code pour la geolocalisation avec depart et fin vue --> 
      <div id="map" class="map"></div>
      <!-- fin code --> 
    <center>
    <div v-if="type_client == 1 ">
      <q-btn 
        size="14px"
        style="background: #0f9743; color: white; width: 280px; text-transform: none; margin-top: 10px;"
        class="q-px-xl q-py-xs"
        glossy
        label="Commander"
        @click="commander"
      />
    </div>
    <div v-if="type_client != 1 ">
      <q-btn 
        size="14px"
        style="background: #0f9743; color: white; width: 280px; text-transform: none; margin-top: 10px;"
        class="q-px-xl q-py-xs"
        glossy
        label="Démarrée"
        @click="demarrer"
      />
      <q-btn 
        size="14px"
        style="background: #0f9743; color: white; width: 280px; text-transform: none; margin-top: 10px;"
        class="q-px-xl q-py-xs"
        glossy
        label="Arrivée"
        @click="arriver"
      />
    </div>
    </center>
    </q-card>
  </q-page>
</template>
<style>
@media (max-width: 360px) {
  .q-page.flex.q-layout-padding {
    min-height: 540px !important;
  }
}
@media (max-width: 768px) {
  .q-page.flex.q-layout-padding {
    min-height: 540px !important;
  }
}
</style>
<script>
import { LMap, LTileLayer, LMarker} from 'vue2-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins
// import des marqueurs ( bug du webpack)
import {
        Icon
    } from 'leaflet';

    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      zoom: 13,
      center: L.latLng(6.196788, 1.204517),
      markerLatLng: L.latLng(6.196788, 1.204517),// insertion du marqueur
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      position: 'determining...'
    }
  },
  methods: {
    getCurrentPosition() {
      Geolocation.getCurrentPosition().then(position => {
        console.log('Current', position);
        this.position = position
      });
    },
    commander(){
      this.$router.push('/new')
    },
    arriver(){
      console.log('arrivé')
    },
    demarrer(){
      // Géolocalisation pour le depart

var map = L.map('map');

L.tileLayer('http://6ddruqfql8.lb.c1.gra7.k8s.ovh.net/tile/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var control = L.Routing.control(L.extend(window.lrmConfig, {
	waypoints: [
		L.latLng(6.196788, 1.204517),
		L.latLng(6.160212008401204, 1.214404640096629)
	],
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
        //serviceUrl: 'http://51.210.211.164:5000/route/v1/'
})).addTo(map);

L.Routing.errorControl(control).addTo(map);

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
    L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });
    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
    });
});
    }
  },
  mounted () {
    
    this.id_client = localStorage.getItem("id_clients");
    this.type_client = localStorage.getItem("idtype");
    console.log(this.type_client)
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({}, (position, err) => {
      console.log('New GPS position')
      this.position = position
    })
  },
  beforeDestroy () {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  },
  
}


</script>
