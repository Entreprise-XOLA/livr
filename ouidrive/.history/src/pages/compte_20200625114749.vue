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
          <div class="self-center full-width no-outline" tabindex="0">
            Nom : {{ nom }}
          </div>
        </template>
      </q-field>

      <br />
      <q-field>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            Prénom : {{ prenom }}
          </div>
        </template>
      </q-field>

      <br />
      <q-field>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            Teéléphone : {{ telephone }}
          </div>
        </template>
      </q-field>

      <br />

      <q-btn
        @click="logout"
        style="width:100%"
        color="primary"
        text-color="white"
        label="déconnexion"
        type="button"
      />
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
    type_client = parseInt(type_client);

    this.$axios
      .get(
        "http://vps732924.ovh.net/ouidrive/index.php/api_admin/get_info_client/" +
          id_client
      )
      .then(response => {
        bar.stop();

        console.log('hiiii');
        this.infocommandes = response.data.info;
        console.log(response.data.info);
        this.nom = response.data.info.nom;
        this.prenom = response.data.info.prenom;
        this.telephone = response.data.info.telephone;
        console.log(response.data);
      })
       .catch(e => {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Erreur de chargement ",
          icon: "report_problem"
        });
      });
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$q.notify({
        color: "primary",
        position: "top",
        message: "Votre compte est déconnecté",
        icon: "close"
      });
      this.$router.push("/");
    }
  }
};
</script>
