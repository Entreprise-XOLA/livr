<template>
  <q-page padding>
    <!-- content -->


<h5 style="padding:0px;margin:10px;font-weight:600;color: chocolate;
"> Feedback </h5>
    
<q-input v-model="text" label="Standard" />

<textarea name="" id="" cols="30" rows="10"></textarea>


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
