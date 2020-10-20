<template>
  <client-only>
    <div class="forgeViewer">
      <navbar :on_viewer="true" class="py-0"></navbar>
      <div class="container-fluid text-center" style="padding: 0">
        <div class="row d-inline-flex w-100">

          <!-- Tree Menu for Fle Browsing -->
          <div class="2D-modeling col-2 bg-light border-left" style="height: 92vh">
            Tree Menu for File Browsing <span class="badge bg-info ml-2 my-4">New</span>
          </div>

          <!-- 3D Modeling Section -->
          <div class="3D-modeling col bg-transparent border-right p-0 m-0" style="height: 92vh">
            <forge-vuer
                :extensions="extensions"
                :get-access-token="handleAccessToken"
                :urn="myObjectUrn"
            />
          </div>

          <div class="col-2 p-0 m-0 mr-4">
            <!-- 2D Modeling Section -->
            <div class="2D-modeling col bg-light border-left" style="height: 46vh">
              2D-Modeling <span class="badge bg-info ml-2 my-4">New</span>
            </div>
            <!-- 2D Modeling Section -->
            <div class="2D-modeling col bg-light border-left" style="height: 46vh">
              Utility <span class="badge bg-info ml-2 my-4">New</span>

              <!-- Utility Buttons Grid -->
              <div class="utility row d-flex justify-content-center">
                <a class="btn m-3" href="mailto: abc@example.com" style="width: 6rem">Email</a>
                <a class="btn m-3" href="#" style="width: 6rem">Screenshot</a>
                <a class="btn m-3" href="#" style="width: 6rem">Graph</a>
                <a class="btn m-3" href="#" style="width: 6rem">Bar Chart</a>
              </div>
            </div>
          </div>

        </div>

        <!--DialogFlow Chat-->
        <div>
          <df-messenger
              agent-id="7f4325ae-c139-4a5e-9aa7-78f5e0f92326"
              allow="microphone"
              chat-icon="favicon.ico"
              chat-title="BIM Assistant"
              language-code="en"
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
import '@/assets/stylesheets/viewer.css';

export default {
  name: "viewer",
  components: {
    navbar
  },
  head: {
    title: 'BIM - Viewer'
  },
  async asyncData({$axios}) {
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
    return {myObjectUrn: objectURN}
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
    handleAccessToken: async function (onSuccess) {
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

</style>
