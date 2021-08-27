<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color:black;">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          DSTECH
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <center>
          <q-item-label v-if="type_client == 1 " header style="background-color:black;">
            <img
              src="../assets/IMG-20210525-WA0010.jpg"
              style="height: 110px; max-width: 150px;margin-top:20px"
            />
            <!-- <q-item-label header style="color:white; font-size: 12px;">
              Qui mieux qu'une femme pour vous conduire.
            </q-item-label> -->
          </q-item-label>
          <q-item-label v-if="type_client != 1 " header style="background-color:black;">
            <img
              src="../assets/IMG-20210525-WA0010.jpg"
              style="height: 110px; max-width: 150px;margin-top:20px"
            />

            <!-- <q-item-label header style="color:white; font-size: 12px;">
              Taxi Tout Confort <br/> conduit par des dames
            </q-item-label> -->
            <q-item-label header style="color:white; font-size: 10px;">
              Application livreur
            </q-item-label>
          </q-item-label>
        </center>
        <q-separator inset />
        <q-item to="/home" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            Accueil
          </q-item-section>
        </q-item>
        <q-separator inset />
        <q-item v-if="type_client == 1 " to="/geo" exact>
          <q-item-section avatar>
            <q-icon name="room" />
          </q-item-section>

          <q-item-section>
            Géolocalisation
          </q-item-section>
        </q-item>
        <q-separator inset />
        <q-item v-if="type_client != 1 " to="/geoenvoi" exact>
          <q-item-section avatar>
            <q-icon name="room" />
          </q-item-section>

          <q-item-section>
            Géolocalisation
          </q-item-section>
        </q-item>
        <q-separator inset />
        <q-item v-if="type_client != 1 " to="/new" exact>
          <q-item-section avatar>
            <q-icon name="local_taxi" />
          </q-item-section>

          <q-item-section>
            Liste des courses
          </q-item-section>
        </q-item>
        <q-separator inset />
        <q-item v-if="type_client != 1 " to="/montanttotal" exact>
          <q-item-section avatar>
            <q-icon name="local_taxi" />
          </q-item-section>

          <q-item-section>
            Montant total gagné
          </q-item-section>
        </q-item>
        <q-separator inset />
        <!-- <q-item v-if="type_client == 1 " to="/geoenvoi" exact>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>

          <q-item-section>
            Envoie de colis
          </q-item-section>
        </q-item>

        <q-separator inset /> -->
        <q-item to="/feedback" exact>
          <q-item-section avatar>
            <q-icon name="feedback" />
          </q-item-section>

          <q-item-section>
            Nous contacter
          </q-item-section>
        </q-item>
        <q-separator inset />
        <q-item to="/compte" exact>
          <q-item-section avatar>
            <q-icon name="account_balance_wallet" />
          </q-item-section>

          <q-item-section>
            Mon compte
          </q-item-section>
        </q-item>
        <q-separator inset />
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="phonelink_lock" />
          </q-item-section>

          <q-item-section @click="logout">
            Déconnecter
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-2 text-black"
      >
        <q-tab
          name="code"
          icon="home"
          label="COLIS"
          @click="code"
        />
        <q-tab
          name="recherche"
          icon="feedback"
          label="Nous Contacter"
          @click="recherche"
        />
        <q-tab
          name="finance"
          icon="money"
          label="RESTAURATION"
          @click="abonnement"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<style>
.q-item.q-router-link--active, .q-item--active {
    color: #0f9743 !important;
}
</style>
<script>
import EssentialLink from "components/EssentialLink.vue";

export default {
  name: "MainLayout",


  components: {},

  data() {
    return {
      leftDrawerOpen: false,
      type_client: null,
      tab: ''
    };
  },
  mounted() {
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
    },
     code () {
       if (this.type_client==1) {
         this.$router.push('/geo')
       } else {
         this.$router.push('/geoenvoi')
       }
      
    },
    recherche () {
      this.$router.push('/feedback')
    },
    abonnement () {
      this.$router.push('/home')
    }
  }
};
</script>
