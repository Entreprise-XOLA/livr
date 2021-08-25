<template>
  <center>
    <div class="q-pa-md" style="max-width:800px;">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <h6 style="text-align:center;margin-bottom:10px; color: white">
        <strong>Demander un nouveau Kiikode</strong>
      </h6>
            <!-- Debut de step -->
        <div class="q-pa-md">
        <div style="font-size: 30px !important;">Faîtes votre commande</div>
        <q-stepper
          v-model="step"
          header-nav
          ref="stepper"
          color="primary"
          animated
          style="background-color:rgba(0, 0, 0, 0.05); padding-top: 40px;"
        >
        <q-step
            :name="1"
            :done="step > 1"
            title="Recommandation"
            :header-nav="step > 1"
          >
          <div>
             <q-input
              filled
              v-model="nomdestinataire"
              bg-color="grey"
              color="white"
              label="Entrer le nom destinataire"
              :rules="[
              val => !!val || '* Champ requis',
              val => val.length > 2 || 'Saisissez au moins 2 caractères',
            ]"
          lazy-rules
            />
          </div>
          </q-step>
          <q-step
            :name="2"
            :done="step > 2"
            title="Entrer le prénom du destinataire"
          >
             <q-input
              filled
              v-model="prenomdestinataire"
              bg-color="grey"
              color="white"
              label="Entrer le prénom du destinataire"
              :rules="[
              val => !!val || '* Champ requis',
              val => val.length > 2 || 'Saisissez au moins 2 caractères',
            ]"
          lazy-rules
            />
          </q-step>
          <q-step
            :name="3"
            :done="step > 3"
            title="Entrer l'adresse du destinataire"
          >
            <q-input
              filled
              v-model="adressedestinataire"
              bg-color="grey"
              color="white"
              label="Entrer l'adresse du destinataire"
              :rules="[
              val => !!val || '* Champ requis',
              val => val.length > 2 || 'Saisissez au moins 2 caractères',
            ]"
          lazy-rules
            />
          </q-step>
          <q-step
            :name="4"
            :done="step > 4"
            title="Entrez le telephone du destinataire"
          >
          <q-input
            filled
            square clearable
            v-model="telephonedestinataire"
            bg-color="grey"
            color="white"
            label="Entrer le telephone portable du destinataire"
            mask="(00228) ## - ## - ## - ##"
            hint="Exemple: (00228) ## - ## - ## - ##"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 24  && val.length < 27) || 'Le Numéro de téléphone est de 8 chiffres'
            ]"
          >
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
          </q-input>
          </q-step>
          <q-step
            :name="5"
            title="Note"
            v-if="consultypecode==3 || consultypecode==4"
          >
            <q-input
              filled
              v-model="note"
              bg-color="grey"
              color="white"
              label="Saisissez la note à envoyer"
              :rules="[
              val => !!val || '* Champ requis',
              val => val.length > 2 || 'Saisissez au moins 2 caractères',
            ]"
          lazy-rules
            />
          </q-step>
          <q-step
            :name="6"
            title="Selection payement"
          >
            <q-select standout="bg-grey text-white" bg-color="grey" color="white" v-model="consultypepaiement" :options="infotypecode" option-value="idpaiement"
                option-label="libelle" label="Selectionnez votre type de payement"  emit-value map-options/><br/>
          </q-step>
          
          <q-step
            :name="7"
            title="Position"
          >
          <div style="color: black; font-size: 19px; text-align: center">Êtes-vous sur d’être devant le portail de votre maison ?</div>
          <q-toggle v-model="dense" style="text-transform: none; width: 90%" label="Obtenir votre position" />
            <div v-if="dense==true">
              <q-input standout bottom-slots v-model="longitude" label="Votre longitude">
                <template v-slot:prepend>
                  <q-icon name="place" />
                </template>
              </q-input>
              <q-input standout bottom-slots v-model="latitude" label="Votre latitude">
                <template v-slot:prepend>
                  <q-icon name="place" />
                </template>
              </q-input>
              <q-page padding class="flex">
              <!-- content -->
                <q-card style="flex:1; height: 480px;">
                    <div>GPS position: Longitude   <strong>{{ longitude }} </strong>Latitude   <strong>{{ latitude }}</strong></div>
                    <l-map :zoom="zoom" :center="center">
                        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                        <l-marker :lat-lng="markerLatLng"></l-marker>
                    </l-map>
                </q-card>
                </q-page>
            </div>
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn v-if="step > 1" flat style="background-color: white; text-color: black; margin-right: 10px; padding-right: 10px;" @click="$refs.stepper.previous()" label="Retour" class="q-ml-sm" />
              <q-btn @click="$refs.stepper.next()" style="background-color: white; text-color: #1976d2" :label="step === 7 ? 'Envoyer' : 'Suivant'" type="submit"/>
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </q-form>

  </div>

  </center>
</template>
<style>
.q-layout.q-layout--standard {
  background: linear-gradient(rgb(255, 255, 255), #ffffff); background-size: cover; background-size: cover !important;
}
.q-stepper__tab.col-grow.flex.items-center.no-wrap.relative-position {
  visibility: hidden;
}
.q-stepper__header.row.items-stretch.justify-between.q-stepper__header--standard-labels.q-stepper__header--border
{
  display: none;
}
.q-stepper {
    box-shadow: 0 0px 0px rgba(255, 255, 255, 255), 0 0px 0px rgba(255, 255, 255, 255), 0 0px 0px 0px rgba(255, 255, 255, 255) !important;
}
.q-stepper__step-inner {
  padding-top: 0px !important;
}
@media (max-width: 360px){
}
.q-btn__wrapper:before {
  font-size: 5px;
    position: relative;
}
#file {
  color: white;
}
.q-radio__inner.relative-position.no-pointer-events.q-radio__inner--falsy{
  color: white;
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
  name: 'PageIndex',
        components: {
            LMap,
            LTileLayer,
            LMarker
        },
  data () {
    return {
      step: 1,
      nomdestinataire: null,
      prenomdestinataire: null,
      adressedestinataire: null,
      telephonedestinataire: null,
      consultypepaiement: null,
      acceptAgreement: false,
      infolibelle: null,
      consultlibelle: null,
      note: null,
      teal: true,
      teal1: false,
      alert: false,
      active: false,
      consultypecode: null,
      raisonsociale: null,
      posteresp: null,
      namesociety: null,
      emailpro: null,
      telentreprise: null,
      telentreprisesecond: null,
      formejuridique: null,
      numfiscal: null,
      nif: null,
      cfe: null,
      nomresp: null,
      prenomresp: null,
      dense: false,
      infotypecode: null,
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
  mounted () {
      // axiosInstance.get('/GrandPublique/liste_ville')
      // .then((response) => {
      //   localStorage.setItem('idville', response.data.idville)
      //   this.infoville = response.data.infos
      //   console.log(response.data)
      // })
      // .catch(() => {
      //   this.$q.notify({
      //     color: 'negative',
      //     position: 'top',
      //     message: 'Erreur de chargement de la page',
      //     icon: 'report_problem'
      //   })
      // })
      
      // axiosInstance.get('/GrandPublique/liste_typecode')
      // .then((response) => {
      //   this.infotypecode = response.data.infos
      //   console.log(this.infotypecode)
      // })
      // .catch(() => {
      //   this.$q.notify({
      //     color: 'negative',
      //     position: 'top',
      //     message: 'Erreur de chargement de la page',
      //     icon: 'report_problem'
      //   })
      // })
      this.idutilisateur = localStorage.getItem("idutilisateur");
      this.longitude = localStorage.getItem("longitude");
      this.latitude = localStorage.getItem("latitude");
      console.log(this.longitude);console.log(this.latitude),
      this.id_client = localStorage.getItem("id_clients");
            this.type_client = localStorage.getItem("type_client");
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
            axiosInstance.get('/Livraison/liste_typepaiement?')
              .then((response) => {
                localStorage.setItem('idpaiement', response.data.infos.idpaiement)
                this.infotypecode = response.data.infos
                console.log(this.infotypecode)
              })
              .catch(() => {
                this.$q.notify({
                  color: 'negative',
                  position: 'top',
                  message: 'Erreur de chargement de la page',
                  icon: 'report_problem'
                })
              })
              this.idutilisateur = localStorage.getItem("idutilisateur");
              this.nom = localStorage.getItem("nom");
              this.prenom = localStorage.getItem("prenom");
              this.tel = localStorage.getItem("tel");
              console.log(this.idutilisateur);console.log(this.nom);console.log(this.prenom);console.log(this.tel)
    
  },
  methods: {
    handleFileUpload(){
    this.file = this.$refs.file.files[0];
    },
    onSubmit () {
      if (this.nomdestinataire != null && this.prenomdestinataire != null && this.adressedestinataire != null && this.telephonedestinataire != null && this.consultypepaiement!=null && this.longitude != null && this.latitude != null) {
      const params = new URLSearchParams()
      params.append('idutilisateur', this.idutilisateur)
      params.append('nomdestinataire', this.nomdestinataire)
      params.append('prenomdestinataire', this.prenomdestinataire)
      params.append('adressedestinataire', this.adressedestinataire)
      params.append('teldestinaire', this.telephonedestinataire)
      params.append('note', this.note)
      params.append('typepaiement', this.consultypepaiement)

      //formData.append('idtypecode', this.consultypecode.idtypecode)
      params.append('longitude', this.longitude)
      params.append('latitude', this.latitude)
       axiosInstance.post(`/Livraison/ajout_commande?`, params)
        .then(response => {
          if (response.data.status === 201) {
            //console.log('Code Enregistré');
            this.$router.push('/home')
            this.$q.notify({
            color: "positive",
            position: "top",
            message: "la commande a bien été effectuée.",
            icon: "close"
      });
          }
          
        })
        .catch(e => {
          this.errors.push(e)
        })
      } else {
        this.$q.notify({
        color: "negative",
        position: "top",
        message: "Veuillez remplir tous les champs.",
        icon: "close"
       });
       }
      
    },
    onReset () {
      this.name = null
      this.Telephone = null
      this.consultVille= null
      this.Quartier = null
      this.consultypecode = null
      this.NumPiece = null
      this.modelpiece = null
      this.dateemission = null
    },
    codeattente() {
      this.$router.push('/codenonvalide')
    },
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
      this.longitude = crd.longitude;
      this.latitude = crd.latitude;
      this.markerLatLng = L.latLng(this.latitude, this.longitude)
      console.log('Votre position actuelle est :');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude : ${crd.longitude}`);
      console.log(`La précision est de ${crd.accuracy} mètres.`);
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
      localStorage.setItem('longitude', this.longitude);
      localStorage.setItem('latitude', this.latitude);
      this.$router.push('/ajoutCode')
  }
  },
  beforeDestroy() {
      // we do cleanup
      Geolocation.clearWatch(this.geoId)
  }
}
</script>
