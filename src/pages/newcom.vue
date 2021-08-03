<template>
  <q-page padding>
    <h5
      style="padding:0px;margin:10px;font-weight:600;color: chocolate;"
    >
      Nouvelle commande
    </h5>

    <!-- content -->
    <q-form  ref="myForm" @submit="confirmer_commande">
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
        <div v-if="lieux_depart==25">
          <q-input
          v-model="nvo_lieu"
          filled
          type="text"
          label="Entrer le quartier de départ"
        />
        </div>
        <br />

        <q-select
          filled
          v-model="lieux_arrive"
          :options="info_lieux"
          option-value="id_lieux"
          option-label="lib_lieu"
          label="Arrivée"
          emit-value
          map-options
        />
        <br />
        <div v-if="lieux_arrive==25">
          <q-input
          v-model="nvo_arrive"
          filled
          type="text"
          label="Entrer le quartier d'arrivée"
        />
        </div>
        <br />
        <q-input
          v-model="date_depart"
          filled
          type="date"
          label="Date Départ"
          hint="Date de départ"
        />
        <br />

        <q-input
          v-model="heure_depart"
          filled
          type="time"
          label="Heure Départ"
        />

        <br />
        <div style="padding-left:10px;padding-right:10px">
          <q-btn
            color="deep-orange"
            style="width:100%"
            text-color="white"
            label="Réserver"
            type="submit"
          />
        </div>
      </div>
    </q-form>
    <center><br>
    <div class="row">
      <img
        src="../assets/imageVoiture.jpg" class="voiturecolle"
        style="margin-top:10px; text-align:center; margin:auto;"

      />
    </div>
  </center>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div > {{ message }}</div>
        </q-card-section>

        <q-card-actions align="right">
         
          <q-btn flat label="Fermer" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'
export default {
  // name: 'PageName',

  data() {
    return {
      lieux_depart: null,
      lieux_arrive: null,
      date_depart: null,
      heure_depart: null,
      nvo_arrive: null,
      nvo_lieu: null,
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
    axiosInstance.get("/api_admin/get_lieux")
      .then(response => {
        this.info_lieux = response.data.info;
        console.log(this.info_lieux)
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
      axiosInstance.get(
          "/api_admin/get_lieux"
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
      if (this.lieux_arrive != null && this.lieux_depart != null && this.date_depart != null && this.heure_depart != null) {
        
        if (this.lieux_arrive != 25 && this.lieux_depart != 25) {

        var id_client = localStorage.getItem("id_clients");

      axiosInstance.get(
          "/api_admin/new_reservation/validation?id_client="+id_client+"&id_arriver="+this.lieux_arrive +'&id_depart='+this.lieux_depart+"&jour_depart="+this.date_depart+"&heure_depart="+this.heure_depart
        )
        .then(response => { 
             this.$refs.myForm.resetValidation();
             this.$q.notify({
            color: "primary",
            position: "top",
            message: "Votre commande a été prise en compte. Une opératrice rentrera en contact avec vous dans quelques minuites",
            icon: "close"
      });
      this.$router.push("/commandes");
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
      if (this.nvo_lieu != null || this.nvo_arrive != null) {

        var id_client = localStorage.getItem("id_clients");
        this.id_user=2
        /* insertion du premier lieu
        this.$axios
        .post(
          "http://vps732924.ovh.net/ouidrive/index.php/api_admin/lieux/add?lib_lieu="+this.nvo_lieu+"&id_user="+this.id_user
        )
        */

        console.log(this.nvo_lieu); console.log(this.nvo_arrive);
        this.$q.notify({
        color: "negative",
        position: "top",
        message: "Veuillez nous écrire via le menu 'Nous Contacter' pour l'ajout de vos lieux.",
        icon: "close"
      });

      }
      } else {
        this.$q.notify({
        color: "negative",
        position: "top",
        message: "Veuillez remplir tous les champs",
        icon: "close"
      });
      }

    }
  }
};
</script>
<style>
h5 {
  color: chocolate;
}
@media (max-width: 430px) {
  .voiturecolle {
    height: 210px; 
    max-width: 500px;
  }
}
@media (width: 768px) {
  .voiturecolle  {
    height: 500px; 
    max-width: 700px;
  }
}
@media (min-width: 1024px) {
  .voiturecolle  {
    height: 500px; 
    max-width: 700px;
  }
}
</style>
