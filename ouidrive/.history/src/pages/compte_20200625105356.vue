<template>
  <q-page padding>
    <!-- content -->
    <h5
      style="padding:0px;margin:10px;font-weight:600;color: chocolate;
"
    >
      Mon compte
    </h5>
    <div>
      <q-field>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0"> Nom :  {{nom}} </div>
        </template>
      </q-field>

      <br />
      <q-field>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">Prenom : {{prenom}} </div>
        </template>
      </q-field>

      <br />
      <q-field>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">Teéléphone :  {{telephone}}  </div>
        </template>
      </q-field>

      <br />
   
<q-btn  v-on:click="logout"  style="width:100%"
              color="primary"
              text-color="white"
              label="déconnexion"
              type="button" @on />

    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

  data() {
    return {
      infocommandes: [],
      fullWidth: false,
      nom: null,
      prenom: null,
      telephone: null,
      contenuarticle: null,
      titrearticle: null,
      progress: false
    };
  },
  mounted() {
    const bar = this.$refs.bar;

    var id_client = localStorage.getItem("id_clients");
    var type_client = localStorage.getItem("type_client");

    if (type_client == 2) {
      this.$axios
        .get(
          "http://vps732924.ovh.net/ouidrive/index.php/api_admin/get_info_client/" +
            id_client
        )
        .then(response => {
          bar.stop();
          this.infocommandes = response.data.info;
          this.nom = response.data.info.nom;
          this.prenom = response.data.info.prenom;
          this.telephone = response.data.info.telephone;
          console.log(response.data);
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Erreur de chargement de la page",
            icon: "report_problem"
          });
        });
    } else {
      this.$axios
        .get(
          "http://vps732924.ovh.net/ouidrive/index.php/api_admin/get_info_client/" +
            id_client
        )
        .then(response => {
          bar.stop();
          this.infocommandes = response.data.info;
          console.log(response.data);
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
  },

  methods: {
    logout() {
      alert('deconnexion')
    }
  }
};
</script>
