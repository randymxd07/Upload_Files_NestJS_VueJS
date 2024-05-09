<script setup lang="ts">
import { useFile } from '../../composables';
const { src, uploadImage } = useFile();
</script>

<template>

    <div v-if="src" class="image-container">
        <img :src="src" alt="Uploaded Image" class="uploaded-image">
    </div>

    <form v-else enctype="multipart/form-data" method="POST" style="margin-bottom: 10px;">
        <label for="image" class="custom-file-upload">
            Select an image
            <input @change="uploadImage" accept=".jpeg" type="file" name="image" id="image">
        </label>
    </form>

</template>

<style src="./css/InputFile.css"></style>
