<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color:darkslategray;">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          OUIDRIVE
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
          <q-item-label header style="background-color:darkslategray;">
            <img
              src="ouiidrive_icon.png"
              style="height: 110px; max-width: 150px;margin-top:20px"
            />

            <q-item-label header style="color:white">
              slogan
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
        <q-item v-if="type_client == 0 " to="/new" exact>
          <q-item-section avatar>
            <q-icon name="local_taxi" />
          </q-item-section>

          <q-item-section>
            Commander un taxi
          </q-item-section>
        </q-item>
        <q-separator inset />
        <q-item to="/commandes" exact>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>

          <q-item-section>
            Mes commandes
          </q-item-section>
        </q-item>

        <q-separator inset />
        <q-item to="/feedback" exact>
          <q-item-section avatar>
            <q-icon name="feedback" />
          </q-item-section>

          <q-item-section>
            Feedback
          </q-item-section>
        </q-item>
        <q-separator inset />
        <q-item to="/help" exact>
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>

          <q-item-section>
            Aide
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
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

export default {
  name: "MainLayout",

  components: {},

  data() {
    return {
      leftDrawerOpen: false,
      type_client: null
    };
  },
  mounted() {
    this.id_client = localStorage.getItem("id_clients");
      var type_client = localStorage.getItem("type_client");
  }
};
</script>
