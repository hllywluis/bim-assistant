<template>
  <div class="fileBrowser">
<!--    <div v-for="(bucket, idx) of bucket_list">-->
<!--      <button>{{bucket}}</button>-->
<!--        <div v-for="(object, idx) of object_list">-->
<!--        <a href="#">{{object}}</a>-->
<!--        </div>-->
<!--    </div>-->



      <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
              class="navbar-toggler justify-content-center mt-3"
              data-target=".dual-collapse2"
              data-toggle="collapse" style="border:none; outline: none" type="button">
        <a class="navbar-brand text-center font-weight-bold mx-auto pl-1" style="letter-spacing: 2px"></a>
      {Project Name Here}</button>

      <!-- Folder links -->
      <div v-for="(folder, idx) of folder_list" :key="idx" class="collapse navbar-collapse w-100 dual-collapse2 my-3 ">
        <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                class="navbar-toggler justify-content-center mt-3"
                data-target=".dual-collapse2"
                data-toggle="collapse" style="border:none; outline: none" type="button">
          <a class="navbar-brand text-center font-weight-bold mx-auto pl-1" style="letter-spacing: 2px"></a>
          {{ folder }}</button>
      </div>

      <div v-for="(object, idx) of object_list" :key="idx" class="collapse navbar-collapse w-100 dual-collapse2 my-3 ">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item text-center ">
                <a class="nav-link" style="cursor: pointer">{{ object }}</a>
              </li>
            </ul>
      </div>
<!--    </div>-->



  </div>
</template>

<script>
export default {
name: "FileBrowser",

  data() {
    return {
      folder_name: '',
      object_name: '',
      folder_list: ["Example Folder", "Example Folder 2"],
      object_list: ["Example Object", "Example Object 2"]
    }
  }
}
</script>

<style scoped>

.fileBrowser{
  width: 100%;
  length: 100%;

}


select{
  width: 100%;
  margin-bottom: 5px;
  border: 0px;
}

a{
  color: black !important;
}

</style>