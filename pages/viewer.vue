<template>
  <client-only>
    <div class="forgeViewer">
      <navbar :on_viewer="true" class="py-0"></navbar>
      <div class="container-fluid text-center" style="padding: 0">
        <div class="row d-inline-flex w-100 ">

          <!-- 3D Modeling Section -->
          <div class="3D-modeling col bg-transparent border-right" style="height: 100vh; padding: 0">
            <forge-vuer
                :get-access-token="handleAccessToken"
                :urn="myObjectUrn"
                :extensions="extensions"
            />
          </div>

          <!-- 2D Modeling Section -->
          <div class="2D-modeling col bg-light border-left" style="height: 100vh">
            2D-Modeling goes here <span class="badge bg-info ml-2">New</span>
          </div>
        </div>

          <div class="col-lg-4">
            <br>
            <df-messenger
                allow="microphone"
                chat-title="BIM Assistant"
                agent-id="7f4325ae-c139-4a5e-9aa7-78f5e0f92326"
                language-code="en"
                chat-icon=""
            ></df-messenger>
          </div>

        <!-- Footer -->
        <footer>
          <p style="font-size: 1rem">&copy; 2020 BIM Assistant. All rights reserved.</p>
        </footer>
      </div>
    </div>
  </client-only>
</template>

<script>
import navbar from "@/components/navbar";
import myAwesomeExtension from "@/components/forge/extensions/myAwesomeExtension";
import myCustomToolbar from "@/components/forge/extensions/myCustomToolbar";

export default {
  name: "viewer",
  components: {
    navbar
  },
  head: {
    title: 'BIM - Viewer'
  },
  async asyncData({ $axios }) {
    let bucketURN
    let bucketDetails
    let objectURN
    await $axios.$get('http://localhost:3000/api/buckets').then(res => {
      bucketURN = res.body.items[8].bucketKey
    })
    await $axios.get(`http://localhost:3000/api/bucketDetails/${bucketURN}`).then(res => {
      bucketDetails = res.body
    })
    await $axios.$get(`http://localhost:3000/api/objects/${bucketURN}`).then(res => {
      objectURN = Buffer.from(res.body.items[0].objectId).toString('base64')
    })
    return { myObjectUrn: objectURN }
  },
  data() {
    return {
      myToken: '',
      tokenPkg: {},
      treeNodePkg: {},
      modelProgress: 0,
      extensions: {
        myAwesomeExtension,
        myCustomToolbar
      }
    }
  },
  methods: {
    handleAccessToken: async function(onSuccess) {
      await this.$axios.$get('http://localhost:3000/api/token').then(res => {
        onSuccess(res.access_token, res.expires_in)
      }).catch(err => {
        console.error(err)
      })
    }
  },
  mounted() {
    (function (d, m) {
      var kommunicateSettings = {
        "appId": "1c4576bf9371418470e54ea4d2258a9d7",
        "popupWidget": true,
        "automaticChatOpenOnNavigation": true
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }
}
</script>

<style scoped>
.forgeViewer {
  background: linear-gradient(135deg, rgba(80, 100, 131, 0.5) 0%, rgba(40, 56, 149, 0.8) 100%) no-repeat center fixed !important;
  overflow: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
}

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

footer {
  padding: 2rem 0 1rem 0;
  color: white;
  text-align: center;
}

footer p {
  margin-bottom: 0;
}
</style>
