<template>
  <q-page padding>

<h5 style="padding:0px;margin:10px;font-weight:600;color: chocolate;
">Nouvelle réservation </h5>

    <!-- content -->
 <q-form @submit="confirmer_commande">
              <div style="max-width: 700px; margin: 0 auto;">
            <q-select
              filled
              v-model="lieux_depart"
              :options="info_lieux"
              option-value="id_lieux"
              option-label="lib_lieu"
              label="Départ"
              emit-value
              map-options
              @input="update_coupure"
          />
<br>
          
                 <q-select
              filled
              v-model="lieux_arrive"
              :options="info_lieux"
              option-value="id_lieux"
              option-label="lib_lieu"
              label="Arrivé"
              emit-value
              map-options
              @input="update_coupure"
          />
<br>
    <q-input v-model="date_depart" filled type="date" hint="Date de départ" />
           <br>   
         
              
  <q-input v-model="heure_depart" filled type="time" hint="Heure de départ" />

<br>
<div style="padding-left:10px;padding-right:10px">  


  btn reser
           </div>
             </div>
          </q-form>

<q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are currently not connected to any network.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

  data () {
    return {
      lieux_depart: null,
      lieux_arrive: null,
      date_depart: null,
      heure_depart: null,
      confirm: false,
      info_lieux: null
    }
  },
  mounted () {
    /* this.id_cycle = this.$route.params.id_cycle
    this.id_ecole = localStorage.getItem('idecole')
    this.id_professeur = localStorage.getItem('id_professeur')
    console.log(this.id_professeur)
    if (this.id_professeur === undefined) {
      this.$router.push('/')
    } */
   // this.idparent = localStorage.getItem('id_parent')
    //this.idinscription = localStorage.getItem('id_inscription')
    //this.id_ecole = localStorage.getItem('idecole')
    this.$axios.get('http://vps732924.ovh.net/ouidrive/index.php/api_admin/get_lieux')
      .then((response) => {
        this.info_lieux = response.data.info
        // console.log(response.data)
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
  methods: {
    info_commande () {
      this.$axios.get('http://vps732924.ovh.net/ouidrive/index.php/api_admin/get_lieux')
        .then((response) => {
          this.notes = response.data.info.matiere
          console.log(this.notes)
          console.log(this.notes[0].listenotes)
          console.log(this.notes[0].listenotes[0].note)
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
    confirmer_commande () {
      this.$axios.get('http://localhost/CodeigniterRESTAPI/index.php/tuteur/liste_coupure?id_ecole=1&id_parent=' + this.idparent + '&id_inscription=' + this.consult_apprenant)
        .then((response) => {
          this.infocoupure = response.data.infos
        // console.log(this.infomatiere)
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Erreur de chargement de la page',
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>
<style >

h5 {
color: chocolate;
}

</style>