<template>
  <div>
    <center>
    <div  style="background-color:darkslategray;padding-top:5%;padding-bottom:5%;margin-bottom:10px">
    <div class="logo">
        <img src="ouiidrive_icon.png" style="height: 110px; max-width: 150px;margin-top:20px;"/>
    </div>
    <div  class="text-grey text-h4" style="margin-top:20px;margin-bottom:20px">

    </div>
    </div>
      <div class="q-pa-md">
      <div style="padding:10%">
        <q-form @submit="postLogin" @reset="onReset" >
          <q-input
            outlined
            v-model="name"
            label="Nom"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Le nom utilisateur est obligatoire']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            outlined
            v-model="password"
            type="password"
            label="Password"
            lazy-rules
            :rules="[ val => !!val  || '*Le mot de passe est obligatoire' ,val => val.length < 16 || 'Maximum 16 charactères'] "
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <div class="row">
            <div class="col-xs-7 col-sm-9 col-md-9" style="text-align:left;">
              <q-checkbox v-model="teal" label="Rester connecter" />
            </div>
            <div class="col-xs-5 col-sm-3 col-md-3" style="text-align:right;">
              <q-btn
                color="primary"
                text-color="white"
                label="Connexion"
                type="submit"
              />
            </div>
          </div>
        </q-form>


        
      </div>
    </div>
      </center>
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


@media (max-width: 360px){
.q-gutter-y-md, .q-gutter-md {
    margin-top: 143px;
}
}
@media (max-width: 768px){
.q-gutter-y-md, .q-gutter-md {
    margin-top: 143px;
}
}
</style>

<script>
export default {
  name: 'PageConnexion',
  data () {
    return {
      name: null,
      password: null,
      teal: true,
      orange: false,
      postBody: null
    }
  },
  methods: {
    onReset () {
      this.name = null
      this.password = null
      this.accept = false
    },
    postLogin () {
      const params = new URLSearchParams()
      params.append('username', this.name)
      params.append('password', this.password)
      this.$axios.post(`http://localhost/CodeigniterRESTAPI/index.php/tuteur/login`, params)
        .then(response => {
          if (response.data.status === 200) {
            localStorage.setItem('id_utilisateur', response.data.id_utilisateur)
            localStorage.setItem('id_parent', response.data.id_parent)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('idecole', response.data.idecole)
            this.$router.push('/accueil')
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
      // this.$router.push('/accueil')
    }
  }
}
</script>
