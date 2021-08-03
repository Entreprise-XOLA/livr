<template>
  <q-page padding>
    <!-- content -->
    <center>
 <q-card class="my-card text-white" style="background: radial-gradient(circle, #000000 0%, #ECA308 100%)"
>
    <img
              src="../assets/CARTE-1.jpg"
              style="height: 180px; max-width: 500px;margin-top:20px"
              
            />
    </q-card>
    <q-btn color="amber" glossy label="Je profite de OuiiCarte" style="margin-top: 5px; text-transform: none;" @click="sublime"/>
     <br>
    
      <q-card class="my-card text-white" style="background: radial-gradient(circle, #000000 0%, #ECA308 100%)">
    <img
              src="../assets/CARTE-PRIMA.jpg"
              style="height: 180px; max-width: 500px;margin-top:20px"

            />
    </q-card>
    <q-btn color="green" glossy label="Je profite de OuiiCarte" style="margin-top: 5px; text-transform: none;" @click="prima"/>
<br>

     <q-card class="my-card text-white" style="background: radial-gradient(circle, #000000 0%, #ECA308 100%)">
    <img
              src="../assets/CARTE-SELECT.jpg"
              style="height: 180px; max-width: 500px;margin-top:20px"

            />
    </q-card>
    <q-btn color="blue"  glossy  label="Je profite de OuiiCarte" style="margin-top: 5px; text-transform: none;" @click="select"/>
    </center>
  </q-page>
</template>

<script>
export default {
  name: 'carte',
  data () {
    return {
      // myArr: [],
      // nom: null
    }
  },
  methods: {
    sublime() {
      var tel = localStorage.getItem("telephone");
      //this.prix = 25000;
      console.log(tel);
      
      this.$q.dialog({
        title: 'Souscription',
        message: 'Ouiicarte disponible à 25 000 F cfa au lieu de 30 000 F cfa pour 10 courses Lomé et agglomération',
        persistent: true
      }).onOk(() => {
        console.log('Soumission effectuée');
        location.href = "https://ouiidrive.com/";
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

    },
    prima() {
      var tel = localStorage.getItem("telephone");
      // this.prixprima = 50000;
      console.log(tel);
      
      this.$q.dialog({
        title: 'Souscription',
        message: 'Ouiicarte disponible à 50 000 F cfa au lieu de 60 000 F cfa pour 20 courses Lomé et agglomération',
        persistent: true
      }).onOk(() => {
        console.log('Soumission effectuée');
        location.href = "https://ouiidrive.com/";
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

    },
    select() {
      var tel = localStorage.getItem("telephone");
      //this.prixselect =75000;
      console.log(tel);
      
      this.$q.dialog({
        title: 'Souscription',
        message: 'Ouiicarte disponible à 75 000 F cfa au lieu de 90 000 F cfa pour 30 courses Lomé et agglomération',
        persistent: true
      }).onOk(() => {
        console.log('Soumission effectuée');
        location.href = "https://ouiidrive.com/";
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

    }
  }
}
</script>
