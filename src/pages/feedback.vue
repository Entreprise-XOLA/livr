<template>
  <q-page padding>
    <!-- content -->


<h5 style="padding:0px;margin:10px;font-weight:600;color: #0f9743;
"> Nous contacter </h5>
    

    <br>
<q-input v-model="text1" label="Sujet" />

<br>
 <q-input
 label="Message"
      v-model="text"
      filled
      type="textarea"
    />
  <center>
  <q-btn
    style="margin-top:05px; text-transform:none; margin-right: 10px;"
    size="10px"          
    color="green"
    @click="envoimessage"
  >
    Envoyer un message
  </q-btn>
  <q-btn
    style="margin-top:05px; text-transform:none;"
    size="10px"          
    color="white"
    text-color="green"
  >
    Passez un appel whatsapp
  </q-btn>
  </center>
  <div class="q-pa-md" style="margin-top:20px !important;">
    <q-layout view="lHh lpr lFf" container style="height: 230px" class="shadow-2 rounded-borders">
      <q-header bordered class="bg-white text-black">
        <q-toolbar>
          <q-toolbar-title class="text-center">
            Message
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <div style="margin-top:20px !important;">
            <div v-for="info in infomessages" :key="info.id_contact">
              <div class="q-pa-md row justify-center">
                <div style="width: 100%; max-width: 400px">
                  <div v-if="info.message!=''">
                  <q-chat-message
                    :text="[info.message]"
                    sent
                  />
                  </div>
                  <div v-if="info.reponse!='' && info.reponse!=null">
                  <q-chat-message
                    :text="[info.reponse]"
                  />
                  </div>
                </div>
              </div>
              </div>
            </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
  </q-page>
</template>
<style>
.q-pa-md {
    padding: 0px 16px !important;
}
.q-message-text--received {
    color: #0f9743;
    border-radius: 4px 4px 4px 0;
}
</style>
<script>
import { axiosInstance } from 'boot/axios'
export default {
  name: 'Contactez',
  data () {
    return {
      // myArr: [],
      infomessages :  [],
      text1: null,
      text: null,
      postBody: null
    }
  },
  mounted() {

    var id_client = localStorage.getItem("id_clients");
    var type_client = localStorage.getItem("type_client");
    console.log(id_client);

    //reception de message

    if(type_client == 0 || type_client == 2){
    axiosInstance.get("/api_admin/get_message_client/"+id_client)
      .then(response => {
        this.infomessages = response.data.info;
        console.log(response.data)
      })
      .catch(() => {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Erreur de chargement de la page",
          icon: "report_problem"
        });
      });
}

  this.id_client = localStorage.getItem("id_clients");
  this.type_client = localStorage.getItem("type_client");
  },
  methods: {
    envoimessage() {
      //const params = new URLSearchParams();
      //params.append("username", this.name);
      //params.append("password", this.password);
        
      this.type_client=0
      this.id_user=2
      this.statu=1
      this.id_precedent=1
      this.date_ajout=1
      axiosInstance.get(
          "/api_admin/contact/add?id_client="+this.id_client+"&objet="+this.text1 +"&message="+this.text+"&statu="+this.statu+"&id_precedent=" +this.id_precedent+
            "&id_user="+this.id_user
        )
        .then(response => { 
          // envoie des infos
          if (response.data.status === 200) {
            console.log(response.data);
          }
          this.$q.notify({
        color: "primary",
        position: "top",
        message: "Votre message a été envoyé avec succès, l'administrateur vous enverra une réponse à l'instant",
        icon: "close"
      });
      this.text1 = null;
      this.text = null;
      this.$router.push('/home')
        })
        .catch(e => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Erreur d'envoie du message'",
            icon: "report_problem"
          });
        });
      // this.$router.push('/accueil')
      
    }
  }
}

</script>
