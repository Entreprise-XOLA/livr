<template>
  <q-page padding>
    <!-- content -->

<h5 style="padding:0px;margin:10px;font-weight:600;color: #0f9743;
"> Liste des courses </h5>
<div v-if="variable==true">Aucune course disponible</div>
<q-list separator >
      <q-item v-for="info in infocommandes" :key="info.idcourse">
        <q-item-section>
          <!-- <q-item-label> Adresse départ : {{ info.adressedepart }}  </q-item-label> -->
      
           <q-item-label> ->  Adresse arrivée : {{ info.adressedestinataire }}  </q-item-label>
          <q-item-label caption lines="3">  
          Date de livraison:  {{ info.datelivraison }}<br>
          <div v-if="type_client==2">
          Prix livraison:  {{ info.prix }} <br>
          </div>
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption> {{  }}</q-item-label>
          <div v-if="info.status==0">
          <q-btn
            style="margin-top:05px; text-transform: none;"
            size="10px"
            color="deep-orange"
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
            @click="demarre(info.idcourse)"
          >
            Emplacement<br/> commande
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
        var id_client = localStorage.getItem("idutilisateur");
              var type_client = localStorage.getItem("idtype");

console.log(type_client);
console.log(id_client);
// if(type_client == 0){
// axiosInstance.get("/api_admin/get_commandes_client/"+id_client)
//       .then(response => {
//      bar.stop();
//         this.infocommandes = response.data.info;
//         console.log(response.data)
//       })
//       .catch(() => {
//         this.$q.notify({
//           color: "negative",
//           position: "top",
//           message: "Erreur de chargement de la page",
//           icon: "report_problem"
//         });
//       });


// }
if(type_client == 2){
axiosInstance.get("/Livraison/liste_courselivreur?idutilisateur="+id_client)
      .then(response => {
     bar.stop();
        this.infocommandes = response.data.infos;
        console.log(this.infocommandes)
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
this.id_client = localStorage.getItem("idutilisateur");
this.type_client = localStorage.getItem("idtype");
},
  methods: {
    appelmodalinfo(info) {
    
    console.log(info)
    this.contenuarticle = info.content.rendered
    this.fullWidth = true
    this.titrearticle = info.title.rendered
    },
    demarre(idcourse){
      console.log(idcourse);
      localStorage.setItem('idcourse', idcourse);
      this.$router.push('/navigationcode/idcourse='+idcourse)
      //  axiosInstance.get('/Livraison/liste_courselivreurgeo?idutilisateur='+this.id_client+'&idcourse='+idcourse)
      //   .then((response) => {
      //     this.latitude = response.data.infos[0].latitude
      //     this.longitude = response.data.infos[0].longitude
      //     console.log(this.latitude);
      //     console.log(this.longitude);
      //     this.$q.notify({
      //       color: 'positive',
      //       position: 'top',
      //       message: 'Livreur supprimé avec succès',
      //       icon: 'report_problem'
      //     })
      //       axiosInstance.get('/Livraison/liste_livreur?')
      //     .then((response) => {
      //       this.listecode = response.data.infos
      //       // this.graph = true
      //       console.log(this.listecode)
      //     })
      //   })
    }
  }
}
</script>
