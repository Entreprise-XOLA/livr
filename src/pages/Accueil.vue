<template>
  <q-page padding>
    <!-- content -->
    <center>
 <q-card class="my-card text-white"
>
    <img
              src="../assets/IMG-20210525-WA0010.jpg"
              style="margin-top:5px"

            />
    </q-card>
        <div  class="q-pa-md q-gutter-sm" >
    <q-btn
      size="14px"
      style="background: #0f9743; color: white; width: 280px; text-transform: none;"
      class="q-px-xl q-py-xs"
      glossy
      label="Précisez votre position"
      @click="position"
    />
    </div>
    <div class="row" style="max-width: 700px; margin: 0 auto;">
      <div class="col-xs-12 col-sm-12 col-md-12">Email: example@example.com</div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12">
      <div style="margin-top:10px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et nihil repellat repellendus veniam laudantium, soluta fuga veritatis iusto accusamus dignissimos, assumenda accusantium cum placeat recusandae quia ipsa quisquam pariatur at!.</div>
    </div>
    </center>
  </q-page>
</template>

<script>

document.addEventListener('deviceready', () => {
  // it's only now that we are sure
var promiseB = FCM.getToken().then(function(result) {
   // do something with result
 console.log("token ok");
   console.log(result);



});

  console.log(FCM.getToken());
  
  FCM.onTokenRefresh(function(token){
    console.log(token);

});

FCM.getToken(function(token){
   console.log("test");
    alert(token);
});
  // the event has triggered
}, false)


export default {
  data () {
    return {
    }
  },
  methods: {
    position(){
      this.$router.push('/geo')
    }
  },
  mounted () {

   

console.log(FCM.getToken());

FCM.onTokenRefresh(function(token){
    alert(token);
});

FCM.getToken(function(token){
    alert(token);
});

FCM.onNotification(function(data){
    if(data.wasTapped){
      //Notification was received on device tray and tapped by the user.
      alert( JSON.stringify(data) );
    }else{
      //Notification was received in foreground. Maybe the user needs to be notified.
      alert( JSON.stringify(data) );
    }
});

  }
}
</script>
