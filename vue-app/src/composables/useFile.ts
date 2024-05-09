import { ref } from 'vue';
import { uploadImageUseCase } from '../services';

export const useFile = () => {

    /**-------------
     *  VARIABLES
    ----------------*/
    const src = ref<string>('');

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

            const { url } = await uploadImageUseCase(formData);

            src.value = url;

        } else {

            alert('No file was selected.');

        }

    }

    return {
        src,
        uploadImage,
    }

}