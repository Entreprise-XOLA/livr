<template>

    <q-page padding class="flex">
        <!-- content -->
        <q-card style="flex:1; height: 400px;">
            <div>GPS position: Longitude   <strong>{{ longitude }} </strong>Latitude   <strong>{{ latitude }}</strong></div>
            <l-map :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker :lat-lng="markerLatLng"></l-marker>
            </l-map>
            <center>
            <q-btn  size="14px" style="background-color: green; color: white; text-transform: none; margin-top: 20px; text-decoration:none;" glossy label="Naviguer vers" @click="naviguervers"/> 
            
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
    import {
        LMap,
        LTileLayer,
        LMarker
    } from 'vue2-leaflet'
    import L from 'leaflet'
    import 'leaflet/dist/leaflet.css'
    //import { Plugins } from '@capacitor/core'
    //const { Geolocation } = Plugins
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
    import { axiosInstance } from 'boot/axios'
    export default {
        name: 'Map',
        components: {
            LMap,
            LTileLayer,
            LMarker
        },
        data() {
            return {
                longitude: null,
                latitude: null,
                type_client: null,
                zoom: 13,
                center: L.latLng(6.196788, 1.204517),
                markerLatLng: L.latLng(6.196788, 1.204517), // insertion du marqueur
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                position: 'determining...'
            }
        },
        methods: {
            getCurrentPosition() {

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(maPosition);
                }

                /*   
                 Geolocation.getCurrentPosition().then(position => {
                   console.log('Current', position);
                   this.position = position
                 });
                   */
            },

            success(pos) {
                var crd = pos.coords;
                //this.longitude = crd.longitude;
                //this.latitude = crd.latitude;
                this.markerLatLng = L.latLng(this.latitude, this.longitude)
                console.log('Votre position actuelle est :');
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude : ${crd.longitude}`);
                console.log(`La précision est de ${crd.accuracy} mètres.`);
                //console.log(this.markerLatLn);
            },
            error(err) {
                //  console.warn(ERREUR (${err.code}): ${err.message}`);
                console.log(err)
            },
            getposition() {
                console.log(navigator.geolocation.getCurrentPosition(this.success, this.error, this.options));

            },
            demarrer() {
                this.$router.push('/new')
            },
            arriver() {
                this.$router.push('/new')
            },
            commander() {
                this.$router.push('/accueil')
            },
            naviguervers() {
                    var target = "_self";
                    var options = "location=yes,hidden=yes,beforeload=yes";
                    var deplace= this.latitude+','+ this.longitude;
                    console.log(deplace);
                    inAppBrowserRef = window.open('https://www.google.com/maps/dir/?api=1&destination='+deplace, target, options);
                    console.log('https://www.google.com/maps/dir/?api=1&destination='+this.latitude,this.longitude);
                }
        },
        mounted() {
            this.id_client = localStorage.getItem("idutilisateur");
            this.idcourse = localStorage.getItem('idcourse');
            console.log(this.idcourse);
            console.log(this.id_client);
            this.getposition();


            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
            // if(navigator.geolocation){

            console.log("info");
            //  }

            //this.getCurrentPosition()

            // we start listening

            /*
              this.geoId = Geolocation.watchPosition({}, (position, err) => {
              console.log('New GPS position')
              this.position = position
                  console.log(position)
            })*/
            axiosInstance.get('/Livraison/liste_courselivreurgeo?idutilisateur='+this.id_client+'&idcourse='+this.idcourse)
                .then((response) => {
                    console.log("toto");
                    this.longitude = response.data.infos[0].longitude
                    this.latitude = response.data.infos[0].latitude
                    console.log(this.longitude);console.log(this.latitude)
                    //console.log(this.longitude+','+this.latitude);
                })
                .catch(() => {
                    this.$q.notify({
                    color: 'negative',
                    position: 'top',
                    message: 'Erreur de chargement de la page',
                    icon: 'report_problem'
                    })
                })
        },
        beforeDestroy() {
            // we do cleanup
            Geolocation.clearWatch(this.geoId)
        }
    }

</script>
