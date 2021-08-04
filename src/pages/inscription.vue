
<template class="headerinscrip">
  <div
    class="window-width row justify-center items-top"
    style="background: linear-gradient(#444342, #0A0701); background-size: cover; height: 100%;"
  >
<div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:100%">
          <q-card-section  id="imgtete">
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
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input square clearable v-model="nom" type="nom" label="Nom" lazy-rules
          :rules="[val => (val && val.length > 0) || 'Le nom  est obligatoire']">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square clearable v-model="prenom" type="prenom" label="Prénom" lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Le prénom est obligatoire'
          ]">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <!-- <q-input square clearable v-model="quartier" type="quartier" label="Quartier" lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Le quartier est obligatoire'
          ]">
                <template v-slot:prepend>
                  <q-icon name="room" />
                </template>
              </q-input> -->
              <q-input square clearable v-model="email" type="email" label="Email" id="email" :rules="[
                val => !!val || '* Champ requis',
                val => val.length > 6 || 'L\'email doit respecter le format d\'email',
              ]"
            lazy-rules filled onchange="validate">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
               <q-input
                  filled
                  square clearable
                  v-model="telephone"
                  label="Téléphone portable"
                  mask="(00228) ## - ## - ## - ##"
                  hint="Exemple: (00228) ## - ## - ## - ##"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 24  && val.length < 27) || 'Le Numéro de téléphone est de 8 chiffres'
                  ]"
                >
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
                </q-input>
            <!-- <q-input filled square clearable v-model="telephone" label="Téléphone" lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 13) || 'Le Télephone  est obligatoire'
                ]" mask="## - ## - ## - ##" hint="exemple: ## - ## - ## - ##" id="telephone" onkeypress="verifierCaracteres(event); return false;"  >
                      <template v-slot:prepend>
                        <q-icon name="phone" />
                      </template>
                    </q-input> -->
              <q-input square clearable v-model="password" type="password" label="Choisir un mot de passe" lazy-rules
          :rules="[
            val => !!val || '*Le mot de passe est obligatoire',
            val => val.length < 16 || 'Maximum 16 charactères'
          ]">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input square clearable v-model="repassword" type="repassword" label="Vérifiez un mot de passe" lazy-rules
          :rules="[
            val => !!val || '*Le mot de passe est obligatoire',
            val => val.length < 16 || 'Maximum 16 charactères'
          ]">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <div class="text-grey-6"><span style="color:red">* </span>Tous les cases sont à renseigner </div>
              <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="green" class="full-width text-white" style="text-transform: none;" label="Créer un compte" @click="postInscription" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <a class="text-grey-6" href="#/" style="text-decoration:none;">Retourner à la page connexion</a>
          </q-card-section>
            </q-form>
            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <div > Votre demande d'enregistrement a bien été prise en compte <br/> Vous pouvez à présent commander votre Taxi Ouiidrive</div>
                </q-card-section>
                <q-card-actions align="right">
                
                  <q-btn flat label="Fermer" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
          </q-dialog>
          </q-card-section>
        </q-card>
      </div>
    </div>
      </div>
</template>
<script>
// import { logged } from '../store/ouiidrive/getters'
// import { mapActions } from 'vuex'
import { Notify } from "quasar";
import { axiosInstance } from 'boot/axios'
export default {
  name: 'Login',
  data () {
    return {
      // myArr: [],
      nom: null,
      prenom: null,
      quartier: null,
      telephone: null,
      password: null,
      repassword: null,
      email: null,
      password_conf: null,
      confirm: false,
      message: null,
      postBody: null,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    resetValidation() {
      this.nom = null;
      this.prenom = null;
      this.quartier = null;
      this.telephone = null;
      this.email= null;
      this.password= null
    },
    // isEmailValid: function() {
    //   return (this.email == "")? "" : (this.reg.test(this.email)) ? 'has-success' : 'has-error';
    // },
    verifierCaracteres(event) {
      var keyCode = event.which ? event.which : event.keyCode;
      var touche = String.fromCharCode(keyCode);
          
      var champ = document.getElementById('telephone');
          
      var caracteres = '0123456789';
      if(telephone.value.length == 0) {
        var caracteres = '123456789';
      }
      else {
        var caracteres = '0123456789';
      }
    },
    postInscription() {
      //const params = new URLSearchParams();
      //params.append("username", this.name);
      //params.append("password", this.password);
if (this.repassword === this.password) {
  // if (!this.email) {
  //       this.$q.notify({
  //       color: "negative",
  //       position: "top",
  //       message: "Email est obligatoire",
  //       icon: "close"
  //     });
  //     } else if (!this.validEmail(this.email)) {
  //       this.$q.notify({
  //       color: "negative",
  //       position: "top",
  //       message: "Un email valid est requis",
  //       icon: "close"
  //     });
  //     }

    if (this.nom != null && this.prenom != null && this.telephone != null && this.email != null && this.validEmail!=false && this.password != null  && (this.reg.test(this.email))!=false) {
      const params = new URLSearchParams()
      this.type_client=0
      this.idrole=4
      
      params.append('idrole', this.idrole)
      params.append('nom', this.nom)
      params.append('prenom', this.prenom)
      params.append('tel', this.telephone)
      params.append('email', this.email)
      params.append('pwd', this.password)
      params.append('confirmpwd', this.repassword)
      axiosInstance.post(
          "/Livraison/ajout_inscriptionclient?", params
        )
        .then(response => { 
          // envoie des infos
          if (response.data.status === 201) {
            console.log(response.data);
            // localStorage.setItem("id_clients", response.data.info.id_clients);
            // localStorage.setItem("type_client", response.data.info.type_client);
            // localStorage.setItem("nom", response.data.info.nom);
            // localStorage.setItem("prenom", response.data.info.prenom);
            // localStorage.setItem("telephone", response.data.info.telephone);
            // localStorage.setItem("quartier", response.data.info.quartier);
            // localStorage.setItem("email", response.data.info.email);
          }
          this.$q.notify({
        color: "primary",
        position: "top",
        message: "Votre enregistrement a été effectué connectez-vous",
        icon: "close"
      });
      this.$router.push("/");
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
        
        } else { 
          this.$q.notify({
        color: "negative",
        position: "top",
        message: "Veuillez remplir correctement tous les champs",
        icon: "close"
      });
        }
} else {
  this.$q.notify({
        color: "negative",
        position: "top",
        message: "Mot de passe non identique",
        icon: "close"
      });
}
      
    }
  }
}

</script>

<style>
.q-card {
  width: 360px;
}
.window-height {
    height: 100vh !important;
}
.q-pt-xl, .q-py-xl {
    padding-top: 10px !important;
}
.q-pb-lg, .q-py-lg {
    padding-bottom: 10px !important;
}
.roundedImage{
    overflow:hidden;
    -webkit-border-radius:50px;
    -moz-border-radius:50px;
    border-radius:50px;
    width:90px;
    height:90px;
}
@media (max-width: 360px) {
  #imgtete{
    background-image: url(../assets/IMG-20210525-WA0006.jpg);
  }
}
@media (max-width: 768px) {
  .column.q-pa-lg {
  padding-bottom: 150px !important;
  }
  #imgtete{
    background-image: url(../assets/IMG-20210525-WA0006.jpg);
  }
}
</style>
