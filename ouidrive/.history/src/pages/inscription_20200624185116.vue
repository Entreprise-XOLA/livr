<template>
  <q-page padding>
    <!-- content -->

<q-input v-model="text" label="Standard" />

<textarea name="" id="" cols="30" rows="10"></textarea>


  <q-btn
            style="margin-top:05px"
            size="10px"
            
            color="blue"
            @click="appelmodalinfo(info)"
          >
            Détails
          
          </q-btn>


          
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
