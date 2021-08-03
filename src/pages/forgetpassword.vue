<template>
  <div
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#444342, #0A0701); background-size: cover; height: 100%; position: fixed;"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:400px;">
          <q-card-section id="imgtete">
            <center>
            <img
              src="../assets/IMG-20210525-WA0010.jpg"
              style="height: 80px; max-width: 150px"
            />
            <!-- <q-item-label header style="color:white; font-size: 12px; padding-top: 0px;">
              Qui mieux qu'une femme pour vous conduire.
            </q-item-label> -->
            </center>
            <!-- <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <img
              src="../assets/image51.png" style="border-radius: 50px;"
            />
            </div> -->
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input square clearable v-model="name" type="tel" label="Téléphone">
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn color="green" class="full-width text-white" style="text-transform: none;" label="Envoyer" @click="postLogin"/>
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm" @click="login">
            <p class="text-grey-6">Retourner à la page de connexion !</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
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
  .column.q-pa-lg {
  padding-bottom: 150px !important;
  }
}
</style>

<script>
import { Notify } from "quasar";
import { axiosInstance } from 'boot/axios'
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
    login() {
      this.$router.push('/')
    },
    postLogin() {
      const params = new URLSearchParams();
      params.append("username", this.name);
      axiosInstance.get(
          "/api_admin/get_login_client?username=" +
            this.name
        )
        .then(response => {
          console.log(response.data);
          console.log(response.data.status);
          if (response.data.status === 200) {
            console.log(response.data);
            localStorage.setItem("id_clients", response.data.info.id_clients);
            localStorage.setItem("type_client", response.data.info.type_client);
            localStorage.setItem("nom", response.data.info.nom);
            localStorage.setItem("prenom", response.data.info.prenom);
            localStorage.setItem("telephone", response.data.info.telephone);
            
            this.$router.push("/home");
          } else {
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
