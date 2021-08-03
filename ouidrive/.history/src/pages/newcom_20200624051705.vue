<template>
  <q-page padding>

<h5 style="padding:0px;margin:10px;font-weight:600;color: chocolate;
">Nouvelle réservation </h5>

    <!-- content -->
 <q-form @submit="liste_note_enfant">
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


            <q-btn color="white" text-color="black" label="Consulter Note" type="submit" />
             </div>
          </q-form>


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
    liste_note_enfant () {
      this.$axios.get('http://localhost/CodeigniterRESTAPI/index.php/tuteur/liste_note_enfant?id_inscription=' + this.consult_apprenant + '&id_parent=' + this.idparent + '&id_coupure=' + this.consult_coupure + '&id_ecole=1')
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
    update_coupure () {
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