<template>
  <q-page padding>
    <!-- content -->

<h5 style="padding:0px;margin:10px;font-weight:600;color: chocolate;
"> Mes réservations </h5>

<q-list separator >

      <q-item v-for="info in infocommandes" :key="info.id_commande">
        <q-item-section>
          <q-item-label> Depart : {{ info.depart }}  </q-item-label>
      
           <q-item-label> ->   arrivé {{ info.arrive }}  </q-item-label>
          <q-item-label caption lines="2">  
          Heure De départ  {{ info.heure_depart }}
         
  </q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption> {{ info.jour_depart }} </q-item-label>

         
          <q-btn
            style="margin-top:05px"
            size="10px"
            
            color="blue"
            @click="appelmodalinfo(info)"
          >
            Détails
          
          </q-btn>
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
export default {
  // name: 'PageName',
data() {
    return {
      infocommandes :  [],
      fullWidth: false,
      contenuarticle: null,
      titrearticle: null,
      progress: false
    };
  },
  mounted() {
    const bar = this.$refs.bar;
     bar.start();
    this.$axios
      .get("http://vps732924.ovh.net/ouidrive/index.php/api_admin/get_commandes_client/1")
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
  },
  methods: {
    appelmodalinfo(info) {
    
    console.log(info)
    this.contenuarticle = info.content.rendered
    this.fullWidth = true
    this.titrearticle = info.title.rendered
    }
  }
}
</script>
