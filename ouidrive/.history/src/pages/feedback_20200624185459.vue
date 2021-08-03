<template>
  <q-page padding>
    <!-- content -->


<h5 style="padding:0px;margin:10px;font-weight:600;color: chocolate;
"> Feedback </h5>
    

    <br>
<q-input v-model="text" label="Sujet" />

<br>
 <q-input
 label="Message"
      v-model="text"
      filled
      type="textarea"
    />


  <q-btn
            style="margin-top:05px"
            size="10px"
            
            color="blue"
            
          >
            Envoyer
          
          </q-btn>

  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
