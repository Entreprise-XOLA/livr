<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
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
          <q-item-label header>
            <img
              src="statics/logo1.png"
              style="height: 110px; max-width: 150px;margin-top:20px"
            />
          </q-item-label>
          <q-item-label header>
  OUIDRIVE
          </q-item-label>
        </center>
        <q-separator inset />
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="radio" />
          </q-item-section>

          <q-item-section>
            Home
          </q-item-section>
        </q-item>
        <q-separator inset />
   <q-item to="/actualite" exact>
          <q-item-section avatar>
            <q-icon name="local_taxi" />
          </q-item-section>

          <q-item-section>
            Commander un taxi
          </q-item-section>
        </q-item>
    <q-separator inset />
        <q-item to="/audio" exact>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>

          <q-item-section>
            Mes commandes
          </q-item-section>
        </q-item>
    
      <q-separator inset />
        <q-item to="/audio" exact>
          <q-item-section avatar>
            <q-icon name="feedback" />
          </q-item-section>

          <q-item-section>
          Feedback
          </q-item-section>
        </q-item>
         <q-separator inset />
        <q-item to="/audio" exact>
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>

          <q-item-section>
          Aide
          </q-item-section>
        </q-item>
        <q-separator inset />
        <q-item to="/about" exact>
          <q-item-section avatar>
            <q-icon name="account_balance_wallet" />
          </q-item-section>

          <q-item-section>
            Mon compte
          </q-item-section>
        </q-item>
      </q-list>


      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in menuList"
          :key="link.label"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,

 menuList : [
  {
    icon: 'login',
    label: 'connect',
    separator: false,
    link: '/connect'
  },
  {
    icon: 'person',
    label: 'Profil',
    separator: false,
    link: '/profil'
  },
  {
    icon: 'local_taxi',
    label: 'Commander un taxi',
    separator: false,
    link: '/commande'
  },
  {
    icon: 'account_balance_wallet',
    label: 'etat du compte',
    separator: false,
    link: '/wallet'
  },
  {
    icon: 'list',
    label: 'mes commandes',
    separator: false,
    link: '/listcommande'
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false,
    link: '/profil'
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false,
    link: '/profil'
  }
]

    }
  }
}
</script>
