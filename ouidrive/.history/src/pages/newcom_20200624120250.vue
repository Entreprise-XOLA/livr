<template>
  <q-page padding>
    <h5
      style="padding:0px;margin:10px;font-weight:600;color: chocolate;
"
    >
      Nouvelle commandes
    </h5>

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
        />
        <br />

        <q-select
          filled
          v-model="lieux_arrive"
          :options="info_lieux"
          option-value="id_lieux"
          option-label="lib_lieu"
          label="Arrivé"
          emit-value
          map-options
        />
        <br />
        <q-input
          v-model="date_depart"
          filled
          type="date"
          hint="Date de départ"
        />
        <br />

        <q-input
          v-model="heure_depart"
          filled
          type="time"
          hint="Heure de départ"
        />

        <br />
        <div style="padding-left:10px;padding-right:10px">
          <q-btn
            color="white"
            style="width:100%"
            text-color="black"
            label="Réserver"
            type="submit"
          />
        </div>
      </div>
    </q-form>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div v-bind="message">  tst  hkk {{ message }}</div>
        </q-card-section>

        <q-card-actions align="right">
         
          <q-btn flat label="Fermer" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

  data() {
    return {
      lieux_depart: null,
      lieux_arrive: null,
      date_depart: null,
      heure_depart: null,
      confirm: false,
      message: null,
      info_lieux: null
    };
  },
  mounted() {
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
    this.$axios
      .get("http://vps732924.ovh.net/ouidrive/index.php/api_admin/get_lieux")
      .then(response => {
        this.info_lieux = response.data.info;
        // console.log(response.data)
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
    info_commande() {
      this.$axios
        .get(
          "http://vps732924.ovh.net/ouidrive/index.php/api_admin/get_lieux"
        )
        .then(response => {})
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Erreur de chargement de la page",
            icon: "report_problem"
          });
        });
    },

    confirmer_commande() {
      var id_client = localStorage.getItem("id_clients");
      this.$axios
        .get(
          "http://vps732924.ovh.net/ouidrive/index.php/api_admin/new_reservation/validation?id_client=1&id_arriver=" +
            this.lieux_arrive +
            "&jour_depart=" +
            this.date_depart +
            "&heure_depart=" +
            this.heure_depart
        )
        .then(response => {
          
              this.$q.notify({
            color: "negative",
            position: "top",
            message: "Erreur de chargement de la page",
            icon: "report_problem"
          });
           // this.message = response.data.message , this.confirm = true;
          // console.log(this.infomatiere)
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
  }
};
</script>
<style>
h5 {
  color: chocolate;
}
</style>
