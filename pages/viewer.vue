<template>
  <client-only>
    <div class="forgeViewer">
      <navbar :on_viewer="true" class="py-0" style="background-color: #818FB7; margin-bottom: 2rem; opacity: 50%"></navbar>
          <div class="container-fluid text-center">
            <div class="row d-inline-flex w-100 ">

              <!-- Left Screen Section -->
              <!-- 3D Modeling Section -->
              <div class="3D-modeling bg-light mb-4 border col-lg-8" style="height: 85.5vh">
                3D-Modeling goes here <span class="badge bg-info ml-2">New</span>
              </div>

              <!-- Left Screen Section -->
              <div class="col-lg-4">
                <!-- 2D Modeling Section -->
                <div class="2D-modeling bg-light border" style="height: 75vh">
                  2D-Modeling goes here <span class="badge bg-info ml-2">New</span>
                </div>
                <br>
                <df-messenger
                    allow="microphone;"
                    chat-title="BIM Assistant"
                    agent-id="7f4325ae-c139-4a5e-9aa7-78f5e0f92326"
                    language-code="en"
                    chat-icon=""
                ></df-messenger>
              </div>
            </div>
          </div>
    </div>
  </client-only>
</template>

<script>
import ForgeVuer from 'forge-vuer'
import axios from 'axios'
import navbar from "@/components/navbar";

export default {
  name: "Viewer",
  components: {
    navbar,
    ForgeVuer
  },
  data() {
    return {
      myObjectUrn: 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6MGQ5YjI0NzQtMDY3Zi00Y2VmLWI2MWYtZjg4OTYwNDkxNjFkLWJrLTEtcG4tMi9SZXZpdCUyME1vZGVsJTIwMS5ydnQ'
    }
  },
  methods: {
    myGetTokenMethodAsync: async function(onSuccess) {
      axios.get('http://localhost:3000/token').then((response) => {
        onSuccess(response.data.access_token, response.data.expires_in)
      }).catch(error => {
        console.error(error)
      })
    }
  },
  mounted (){
    (function(d, m){
      var kommunicateSettings = {"appId":"1c4576bf9371418470e54ea4d2258a9d7","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }
}

</script>

<style scoped>

iframe {
  border: 10px;
  -moz-border-radius: 12px;
  -webkit-border-radius: 12px;
  border-radius: 12px;
  -moz-box-shadow: 4px 4px 14px #000;
  -webkit-box-shadow: 4px 4px 14px #000;
  box-shadow: 4px 4px 14px #000;
}

df-messenger {
  --df-messenger-bot-message: #878fac;
  --df-messenger-button-titlebar-color: #818FB7;
  --df-messenger-chat-background-color: #fafafa;
  --df-messenger-font-color: white;
  --df-messenger-send-icon: #878fac;
  --df-messenger-user-message: #4B7AA1;
}

.btn {
  width: 15em;
  border-color: #e5e5e5;
}

.btn:hover {
  background-color: #e5e5e5 !important;
  color: black;
}

.icon:hover{
  color: #fff;
  background-color: #dc3545;
  transition: all 0.3s;
  border: #dc3545;
}

</style>
