<template>
 


  <div class="q-pa-md">
<div style="padding:10%">
          <q-form @submit="postLogin" @reset="onReset">
            <q-input
              outlined
              v-model="name"
              label="Nom"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) ||
                  'Le nom  est obligatoire'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

    <q-input
              outlined
              v-model="name"
              label="Prenom"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) ||
                  'Le nom prenom est obligatoire'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>



    <q-input
              outlined
              v-model="name"
              label="Telephone"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) ||
                  'Le nom Telephone  est obligatoire '
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
            <q-input
              outlined
              v-model="password"
              type="password"
              label="Password"
              lazy-rules
              :rules="[
                val => !!val || '*Le mot de passe est obligatoire',
                val => val.length < 16 || 'Maximum 16 charactères'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <div class="row">
             
              <div class="col-xs-12 col-sm-12 col-md-12" style="text-align:right;">
                <q-btn style="width:100%"
                  color="primary"
                  text-color="white"
                  label="Connexion"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
          
  </div>  </div>
</template>

<style lang="stylus" scoped>
.q-pa-md
  width 100%
  max-width:500px
  padding:0%
  padding-top:0%
</style>
<style>
@media (max-width: 360px) {
  .q-gutter-y-md,
  .q-gutter-md {
    margin-top: 143px;
  }
}
@media (max-width: 768px) {
  .q-gutter-y-md,
  .q-gutter-md {
    margin-top: 143px;
  }
}
</style>

<script>
import { Notify } from 'quasar'

export default {

  
  name: "PageConnexion",
  data() {
    return {
      name: null,
      password: null,
      teal: true,
      orange: false,
      postBody: null
    };
  },
  methods: {
    onReset() {
      this.name = null;
      this.password = null;
      this.accept = false;
    },
    postLogin() {
      const params = new URLSearchParams();
      params.append("username", this.name);
      params.append("password", this.password);
      this.$axios
        .get(
          'http://vps732924.ovh.net/ouidrive/index.php/api_admin/get_login_client?username='+this.name+'&password='+this.password,
          
        )
        .then(response => {
          console.log(response.data);
          if (response.data.status === 200) {
            localStorage.setItem(
              "id_utilisateur",
              response.data.id_utilisateur
            );
            console.log(response.data);
            localStorage.setItem("id_clients", response.data.id_clients);
       
            this.$router.push("/home");
          }else{

   this.$q.notify({
          color: "negative",
          position: "top",
          message: response.data.message,
          icon: "report_problem"
        });

          }
        })
        .catch(e => {
              Notify.notify({
          color: "negative",
          position: "top",
          message: "Erreur de chargement de la page",
          icon: "report_problem"
        });
        });
      // this.$router.push('/accueil')
    }
  }
};
</script>
