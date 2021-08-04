<template>
  <q-page padding>
    <!-- content -->
    <h5
      style="padding:0px;margin:10px;font-weight:600;color: #0f9743;
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
            Téléphone : {{ telephone }}
          </div>
        </template>
      </q-field>
      <q-field>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            Email : {{ adress }}
          </div>
        </template>
      </q-field>
      <q-field v-if="type_client != 1" >
        <template v-slot:control >
          <div  class="self-center full-width no-outline" tabindex="0">
            Montant Total Gagné : {{ solde }}
          </div>
        </template>
      </q-field>

      <br />

      <q-btn
        @click="logout"
        style="width:100%"
        color="green"
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
      adress: null,
      contenuarticle: null,
      titrearticle: null,
      type_client: null,
      solde: null,
      progress: false
    };
  },
  mounted() {
    const bar = this.$refs.bar;
    var id_client = localStorage.getItem("id_clients");
    var type_client = localStorage.getItem("type_client");
    var nom = localStorage.getItem("nom");
    var prenom = localStorage.getItem("prenom");
    var telephone = localStorage.getItem("tel");
    var adress = localStorage.getItem("email");
    var solde=localStorage.getItem("solde");
    //var prenom = localStorage.getItem("prenom");
        this.nom =nom;
        this.prenom = prenom;
        this.telephone =telephone;
        this.adress =adress;
        this.solde=solde;
    type_client = parseInt(type_client);
    console.log(adress);
    
    this.id_client = localStorage.getItem("id_clients");
    this.type_client = localStorage.getItem("idtype");
    console.log(this.type_client);
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
