<template>
  <div class="fileBrowser">
    <div v-for="(bucket, idx) of bucket_list" :key="idx">
      <button>{{ bucket }}</button>
    </div>
  </div>
</template>

<script>
export default {
name: "FileBrowser",

  data() {
    return {
      bucket_name: '',
      object_name: '',
      bucket_list: ["Example Bucket", "Example Bucket 2"],
    }
  }
}
</script>

<style scoped>

.fileBrowser{
  width: 100%;
  length: 100%;

}

button{
  width: 100%;
  margin-bottom: 5px;
  border: 0px;
}

</style>