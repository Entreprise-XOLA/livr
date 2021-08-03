<template>
  <q-page padding>
    <!-- content -->

<h5 style="padding:0px;margin:10px;font-weight:600;color: #0f9743;
"> Montant Total gagné </h5>
<div v-if="variable==true">Aucun montant disponible encore</div>
<q-list separator >
      <q-item v-for="info in infocommandes" :key="info.id_commande">
        <q-item-section>
          <q-item-label> Départ : {{ info.depart }}  </q-item-label>
      
           <q-item-label> ->   arrivée {{ info.arrive }}  </q-item-label>
          <q-item-label caption lines="3">  
          Heure De départ:  {{ info.heure_depart }}<br>
          <div v-if="type_client==2">
          Client:  {{ info.nom }} {{ info.prenom }}<br>
          Téléphone Client:  {{ info.telephone }}<br>
          </div>
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption> {{ info.jour_depart }}</q-item-label>
          <div v-if="info.status==0">
          <q-btn
            style="margin-top:05px; text-transform: none;"
            size="10px"
            color="green"
          >
            En attente<br/> de validation
          </q-btn>
          </div>
          <div v-if="info.status==2">
          <q-btn
            style="margin-top:05px; text-transform: none;"
            size="10px"
            color="green"
          >
            Validé<br/>
          </q-btn>
          </div>
          <div v-if="type_client==2">
          <q-btn
            style="margin-top:05px; text-transform: none;"
            size="10px"
            color="red"
            @click="demarre"
          >
            Démarrer<br/>
          </q-btn>
          </div>
        </q-item-section>
      </q-item>


    </q-list>

    <q-dialog v-model="fullWidth" full-width>
      <q-card>
        <q-card-section>
          <div class="text-h6">  {{titrearticle}} </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
<div v-html="contenuarticle"> </div>


 
      </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="fermer" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
     <q-ajax-bar
      ref="bar"
      position="top"
      color="accent"
      size="10px"
      skip-hijack
    />

  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'
export default {
  // name: 'PageName',
data() {
    return {
      infocommandes :  [],
      fullWidth: false,
      contenuarticle: null,
      titrearticle: null,
      progress: false,
      type_client: null,
      variable: false
    };
  },
  mounted() {
    const bar = this.$refs.bar;
     bar.start();
        var id_client = localStorage.getItem("id_clients");
              var type_client = localStorage.getItem("type_client");

console.log(type_client);
console.log(id_client);
if(type_client == 0){
axiosInstance.get("/api_admin/get_commandes_client/"+id_client)
      .then(response => {
     bar.stop();
        this.infocommandes = response.data.info;
        console.log(response.data)
      })
      .catch(() => {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Erreur de chargement de la page",
          icon: "report_problem"
        });
      });


}
if(type_client == 2){
axiosInstance.get("/api_admin/get_commandes_conductrice/"+id_client)
      .then(response => {
     bar.stop();
        this.infocommandes = response.data.info;
        console.log(response.data)
      })
      .catch(() => {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Erreur de chargement de la page",
          icon: "report_problem"
        });
      });


}
this.id_client = localStorage.getItem("id_clients");
this.type_client = localStorage.getItem("type_client");
},
  methods: {
    appelmodalinfo(info) {
    
    console.log(info)
    this.contenuarticle = info.content.rendered
    this.fullWidth = true
    this.titrearticle = info.title.rendered
    },
    demarre(){
      var tel = localStorage.getItem("telephone");
      // this.prixprima = 50000;
      console.log(tel);
      
      this.$q.dialog({
        title: 'Souscription',
        message: 'Vous confirmer votre action?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        console.log('Soumission effectuée')
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> second OK catcher')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>
