<template>
  <client-only>
    <div class="forgeViewer">
      <navbar :on_viewer="true" class="py-0"></navbar>
      <div class="container-fluid text-center" style="padding: 0">
        <div class="d-inline-flex w-100">

          <!-- Tree Menu for File Browsing -->
          <div class="2D-modeling col-2 bg-light border-right" style="height: 92vh">
            <div class="fileBrowser">

              <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                      class="navbar-toggler justify-content-center mt-3"
                      data-target=".dual-collapse2"
                      data-toggle="collapse" style="border:none; outline: none" type="button">
                <a class="navbar-brand text-center font-weight-bold mx-auto pl-1" style="letter-spacing: 2px"></a>
                {{ project_name }}
              </button>

<!--               object links -->
              <div v-for="(object, idx) of myObjectList" :key="idx"
                   class="collapse navbar-collapse w-100 dual-collapse2 my-3 ">
                <button @click="loadObject(object)" aria-controls="innerSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                        class="navbar-toggler justify-content-center mt-3"
                        data-target=".dual-collapse2"
                         style="border:none; outline: none" type="button">
                  <a  class="navbar-brand text-center font-weight-bold mx-auto pl-1" style="letter-spacing: 2px"></a>
                  object {{ object }}
                </button>

                <!-- subComponent Links -->
                <div v-for="(subComponent, idx) of subComponents" :key="idx"
                     class="collapse navbar-collapse w-100 dual-collapse2 my-3 ">
                  <ul aria-controls="inner2SupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                      data-target=".dual-collapse2"
                      class="navbar-nav ml-auto">
                    <li class="nav-item text-center ">
                      <a class="nav-link" style="cursor: pointer"> {{ subComponent }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

            <!-- 3D Modeling Section -->
            <div class="3D-modeling col bg-transparent border-0 p-0 m-0" style="height: 92vh">

              <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                <button type="button" class="btn btn-secondary">Open</button>
                <button type="button" class="btn btn-secondary">Close</button>

                <div class="btn-group" role="group">
                  <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Levels
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" href="#">Dropdown link</a>
                    <a class="dropdown-item" href="#">Dropdown link</a>
                  </div>
                </div>
              </div>

              <forge-vuer
                  :extensions="extensions"
                  :get-access-token="handleAccessToken"
                  :urn="myObjectURN"
              />
            </div>

          <div class="col-2 p-0 m-0 mr-4">
            <!-- 2D Modeling Section -->
            <div class="2D-modeling col bg-light border-left" style="height: 46vh">
              2D-Modeling <span class="badge bg-info ml-2 my-4">New</span>
            </div>
            <!-- 2D Modeling Section -->
            <div class="2D-modeling col bg-light border-left" style="height: 46vh; overflow: auto">
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

        <!-- DialogFlow Chat -->
        <div>
          <df-messenger
              agent-id="7f4325ae-c139-4a5e-9aa7-78f5e0f92326"
              allow="microphone"
              chat-icon="favicon.ico"
              chat-title="BIM Assistant"
              language-code="en"
          ></df-messenger>
        </div>
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
  computed: {
    user() {
      return this.$store.state.user.user
    }
  },
  head: {
    title: 'BIM - Viewer'
  },
  async asyncData({$axios}) {
    let bucketURN
    let bucketDetails
    let objectList = []
    let i = 0
    await $axios.$get('http://localhost:3000/api/buckets').then(res => {
      bucketURN = res.body.items[4].bucketKey
    })
    await $axios.get(`http://localhost:3000/api/bucketDetails/${bucketURN}`).then(res => {
      bucketDetails = res.body
    })
    await $axios.$get(`http://localhost:3000/api/objects/${bucketURN}`).then(res => {
      //objectURN = Buffer.from(res.body.items[0].objectId).toString('base64')
      // TODO: give each object a default name and let user change it (objects dont have names...)
      // for (i in Buffer.from(res.body.items).length, i++){
      //   objectList.push (Buffer.from(res.body.items[0].objectName).toString('base64'))
      // }
      for (i = 0; i < Buffer.from(res.body.items).length; i++) {
        objectList.push(i)
      }
    })
    return {myObjectList: objectList}
  },
  firestore() {

  },
  data() {
    return {
      myObjectURN: '',
      project_name: "{Your Project Name}",
      folder_name: '',
      object_name: '',
      folder_list: ["Example Folder"],
      object_list: ["Example Object", "Example Object 2"],
      myToken: '',
      tokenPkg: {},
      treeNodePkg: {},
      modelProgress: 0,

      subComponents: ["living", "dining"],

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
    },
    loadObject: async function (obj) {
      let bucketURN
      let objectURN
      await this.$axios.$get('http://localhost:3000/api/buckets').then(res => {
        bucketURN = res.body.items[4].bucketKey
      })
      await this.$axios.$get(`http://localhost:3000/api/objects/${bucketURN}`).then(res => {
        objectURN = Buffer.from(res.body.items[obj].objectId).toString('base64')
      })
      this.myObjectURN = objectURN
    }
  },
}
</script>

<style scoped>



</style>
