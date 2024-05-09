<script setup lang="ts">
import { ref } from 'vue';
import nestApi from './api/nestApi';

const url = ref<string>('');

/**---------------------------
 * UPLOAD IMAGE FUNCTION
 * @param {Event} event 
 * @returns {Promise<void>}
------------------------------*/
const uploadImage = async (event: Event): Promise<void> => {

  const fileInput = event.target as HTMLInputElement;

  const file = fileInput.files?.[0]; // GET THE FIRST SELECTED FILE //

  if (file) {

    const formData = new FormData();
    formData.append('file', file);

    const { data } = await nestApi.post('file/upload', formData);

    url.value = data.url;

  } else {

    alert('No se seleccionó ningún archivo.');

  }

}
</script>

<template>

  <h1>Image Uploader</h1>

  <div v-if="url" class="image-container">
    <img :src="url" alt="Uploaded Image" class="uploaded-image">
  </div>

  <form v-else enctype="multipart/form-data" method="POST" style="margin-bottom: 10px;">
    <label for="image" class="custom-file-upload">
      Seleccione una imagen
      <input @change="uploadImage" accept=".jpeg" type="file" name="image" id="image">
    </label>
  </form>

</template>

<style scoped>
.custom-file-upload {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  outline: 2px solid #007bff;
}

.custom-file-upload:hover {
  background-color: #007bff;
}

#image {
  display: none;
}

.image-container {
  text-align: center;
}

.uploaded-image {
  max-width: 100%;
  max-height: 400px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
