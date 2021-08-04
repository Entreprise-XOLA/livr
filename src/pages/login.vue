<template>
  <div
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#444342, #0A0701); background-size: cover; height: 100%; position: fixed;"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:500px;">
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
              <q-input
                  filled
                  square clearable
                  v-model="name"
                  label="Téléphone portable"
                  mask="(00228) ## - ## - ## - ##"
                  hint="Exemple: (00228) ## - ## - ## - ##"
                  
                >
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
                </q-input>
                    
              <q-input square clearable v-model="password" type="password" label="Mot de passe" >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="green" class="full-width text-white" style="text-transform: none;" label="Se connecter" @click="postLogin"/><br/><br/><br/>
             <q-btn to="/inscription" unelevated size="lg" color="green" class="full-width text-white" style="text-transform: none;" label="S'enregistrer" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm" style="background-color: white">
            <p class="text-grey-6" @click="motdepasseoublie">Mot de passe oublié ?</p>
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
  #imgtete{
    background-image: url(../assets/IMG-20210525-WA0006.jpg);
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
  #imgtete{
    background-image: url(../assets/IMG-20210525-WA0006.jpg);
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
      phone: ref(null),
      postBody: null
    };
  },
  methods: {
    onReset() {
      this.name = null;
      this.password = null;
      this.accept = false;
    },
    motdepasseoublie(){
      this.$router.push('/motdepasseoublie')
    },  
    postLogin() {
      const params = new URLSearchParams();
      params.append("tel", this.name);
      params.append("pwd", this.password);
      axiosInstance.post(
          "/Livraison/login1?", params
        )
        .then(response => {
          console.log(response.data);
          console.log(response.data.status);
          if (response.data.status === 200) {
            console.log(response.data);
            this.$router.push("/home");
            localStorage.setItem("idutilisateur", response.data.idutilisateur);
            localStorage.setItem("idtype", response.data.idtype);
            localStorage.setItem("nom", response.data.nom);
            localStorage.setItem("prenom", response.data.prenom);
            localStorage.setItem("tel", response.data.tel);
            localStorage.setItem("email", response.data.email);
            
          } else {
            this.$q.notify({
              color: "negative",
              position: "top",
              message: "Les informations sont incorrectes",
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
