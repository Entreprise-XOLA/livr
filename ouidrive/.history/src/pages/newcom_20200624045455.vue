<template>
  <q-page padding>
    <!-- content -->
 <q-form @submit="liste_note_enfant">
              <div style="max-width: 700px; margin: 0 auto;">
            <q-select
              filled
              v-model="lieux_depart"
              :options="info_lieux"
              option-value="id_lieux"
              option-label="lib_lieu"
              label="Apprenant"
              emit-value
              map-options
              @input="update_coupure"
          />

                 <q-select
              filled
              v-model="lieux_arrive"
              :options="info_lieux"
              option-value="id_lieux"
              option-label="lib_lieu"
              label="Apprenant"
              emit-value
              map-options
              @input="update_coupure"
          />
            <q-select
              filled
              v-model="consult_coupure"
              :options="infocoupure"
              option-value="idcoupure"
              option-label="libellecoupure"
              label="Coupure annee"
              emit-value
              map-options
            />
            <br/>
            <q-btn color="white" text-color="black" label="Consulter Note" type="submit" />
             </div>
          </q-form>


  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
