<template>
  <div class="profile">
    <section class="background-picture">
      <navbar :on_profile="true"></navbar>
      <div class="container-fluid main-message w-100 ">
        <h1 class="text-center text-md-left">My Profile</h1>
      </div>
    </section>
    <h5>Username: {{ userName || 'No Name Set' }}</h5>
    <h5>Company: {{ companyName || 'No Company Name Set' }}</h5>
    <h5>Role: {{ userRole }}</h5>
    <h5>Phone: {{ phone || 'No Phone Number Set' }}</h5>
    <h5>Email: {{ userEmail || 'No Email Set' }}</h5>
    <div v-if="userRole==='Construction Manager'">
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar";

export default {
  name: "profile",
  components: {navbar},

  computed: {
    user() {
      return this.$store.state.user.user
    }
  },
  data() {
    return {
      userRole: '',
      companyName: '',
      phone: '',
      userName: '',
      userEmail: '',
      userPassword: '',
      on_manager: Boolean,
    }
  },
  firestore() {
    const userdataRef = this.$fireStore.collection('userdata').doc(this.user.data.uid)
    userdataRef.onSnapshot((docSnapshot) => {
      this.userRole = docSnapshot.data()['userRole']
      this.companyName = docSnapshot.data()['companyName']
      this.phone = docSnapshot.data()['userPhoneNumber']
      this.userName = docSnapshot.data()['username']
      this.userEmail = docSnapshot.data()['userEmail']
      this.userPassword = docSnapshot.data()['userPassword']
      if (this.userRole == null) {
        this.userRole = "Software Engineer"
      }
    })
    //const companyEmployees = db.collection('userdata')
  },
  head: {
    title: 'BIM - Profile'
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