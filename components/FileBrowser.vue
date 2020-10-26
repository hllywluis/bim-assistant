<template>
  <div class="fileBrowser">
    <div v-for="(bucket, idx) of bucket_list" :key="idx">
      <select :title="bucket" :name="bucket" class="" v-model="bucket_name">
        <div v-for="(object, idx) of object_list" :key="idx">
          <option >{{ object }}</option>
        </div>
      </select>
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

</style>