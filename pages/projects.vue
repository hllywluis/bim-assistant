<template>
  <div class="projects">
    <section class="background-picture">
      <navbar :on_projects="true"></navbar>
      <div class="container main-message w-100 ">
        <h1 class="text-center text-md-left">Projects</h1>
        <h5 v-if="!on_delete && !on_create" class="text-center text-md-left">Here are all of your BIM projects</h5>
        <h5 v-show="on_delete" class="text-center text-md-left">Select a project to delete forever</h5>
        <h5 v-show="on_create" class="text-center text-md-left">Enter a name for your new project</h5>
      </div>
    </section>

    <div class="projects-list container-fluid mt-3">
      <button v-if="!on_delete && !on_create" v-on:click="on_create=true" class="btn btn-dark mx-auto text-center"
              type="button">Create New Project
      </button>
      <div class="form-group text-center" v-show="on_create">
        <input v-model="project_name" type="text" id="newProjectName" placeholder="New Project Name *"
               class="form-control align-content-center" style="width: 50%;" required>
        <div>
          <button v-on:click="new_project(project_name)" class="btn btn-dark mx-auto text-center" type="button">Submit
          </button>
        </div>
        <button v-if="on_create && !on_delete" v-on:click="on_create=false" class="btn btn-dark mx-auto text-center"
                type="button">Cancel
        </button>
      </div>

      <div v-for="(project, idx) of project_list" :key="idx">
        <nuxt-link v-if="!on_create && !on_delete" to="viewer" class="btn btn-light mx-auto text-center">{{
            project
          }}
        </nuxt-link>
      </div>

      <button v-if="!on_delete && !on_create && project_list.length>0" v-on:click="on_delete=true"
              class="btn btn-danger mx-auto text-center" type="button">Delete Project
      </button>

      <div class="form-group" v-show="on_delete">
        <div v-for="(project, idx) of project_list" :key="idx">
          <button type="button" class="for-hover btn btn-dark btn-danger mx-auto text-center" data-toggle="modal"
                  :data-target="'#deleteConfirmModalFor' + idx">
            {{ project }}
          </button>

          <div class="modal fade" :id="'deleteConfirmModalFor' + idx" tabindex="-1" role="dialog"
               aria-labelledby="deleteConfirmModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="deleteConfirmLabel">Are you sure you'd like to delete {{ project }}?</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <strong class="my-auto">This action cannot be undone.</strong>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary my-auto" data-dismiss="modal"
                          style="width: 40% !important;">Cancel
                  </button>
                  <button type="button" class="btn btn-danger my-auto" @click="delete_project(project)"
                          style="width: 40% !important;" data-dismiss="modal">Delete {{ project }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--          <h1 v-if="!on_create && on_delete" @click="delete_project(project)" class="for-hover btn btn-dark btn-danger mx-auto text-center">{{ project }}</h1>-->
        </div>
        <button v-if="!on_create && on_delete" v-on:click="on_delete=false" class="btn btn-dark mx-auto text-center"
                type="button">Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar'

export default {
  name: 'projects',
  components: {
    navbar
  },
  head: {
    title: 'BIM - Projects'
  },
  computed: {
    user() {
      return this.$store.state.user.user
    }
  },
  data() {
    return {
      project_name: '',
      userName: '',
      project_list: [],
      on_create: false,
      on_delete: false,
    }
  },
  methods: {
    // creates new project
    new_project: function () {
      const userdataRef = this.$fireStore.collection('userdata').doc(this.user.data.uid)
      userdataRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          if (docSnapshot.get('projects')) {
            let project_list = docSnapshot.get('projects')
            // Checks for existing project with same name
            if (project_list.includes(this.project_name)) {
              alert("A project already exists with this name");
            } else {
              project_list.push(this.project_name)
              userdataRef.update({
                projects: project_list
              })
            }
          }
        }
        this.on_create = false
      })
    },
    //deletes an existing project
    delete_project: function (proj) {
      const userdataRef = this.$fireStore.collection('userdata').doc(this.user.data.uid)
      userdataRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          if (docSnapshot.get('projects')) {
            let project_list = docSnapshot.get('projects')
            const index = project_list.indexOf(proj)
            project_list.splice(index, 1)
            userdataRef.update({
              projects: project_list
            })
          }
        }
        this.on_delete = false
      })
    }
  },
  firestore() {
    const userdataRef = this.$fireStore.collection('userdata').doc(this.user.data.uid)
    userdataRef.onSnapshot((docSnapshot) => {
      this.project_list = docSnapshot.data()['projects']
    })
  }
}
</script>

<style scoped>

.background-picture::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 4.7rem;
  background: url(../assets/images/wave-large.png) center no-repeat;
  background-size: cover;
}

.background-picture {
  width: 100%;
  height: 45vh;
  background: linear-gradient(135deg, rgba(80, 100, 131, 0.5) 0%, rgba(40, 56, 149, 0.8) 100%),
  url("../assets/images/construction.jpg") center no-repeat;
  background-size: cover;
  position: relative;
}

.projects-list {
  text-align: center;
}

.btn {
  width: 15rem;
}

.btn-danger:hover {
  background-color: #dc3545;
}

.for-hover:hover {
  -webkit-animation: shake .3s ease-in-out .3s infinite alternate;
}

@-webkit-keyframes shake {
  from {
    -webkit-transform: rotate(3deg);
  }

  to {
    -webkit-transform: rotate(-3deg);
    -webkit-transform-origin: center center;
  }
}


/*Screen Resolution with min-width: 700px*/
@media screen and (min-width: 768px) {

  .background-picture::before {
    height: 6.5rem;
  }

  .main-message {
    transform: translateY(50%);
  }
}

/*Screen Resolution with min-width: 950px*/
@media screen and (min-width: 950px) {

  .background-picture {
    height: 22.7rem;
  }

  .background-picture::before {
    height: 9.7rem;
  }

  .main-message {
    transform: translateY(30%);
  }

  .main-message h1 {
    font-size: 3.0rem;
  }
}

/*Screen Resolution with min-width: 1200px*/
@media screen and (min-width: 1100px) {

  .background-picture {
    height: 23.7rem;
  }

  .background-picture::before {
    height: 13.7rem;
  }

  .main-message h1 {
    font-size: 2.7rem;
  }

  .main-message h5 {
    font-size: 1.2rem;
  }
}

</style>