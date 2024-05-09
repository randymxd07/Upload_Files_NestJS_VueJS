import nestApi from "../api/nestApi";
import { UploadImageResponse } from "../interfaces";

export const uploadImageUseCase = async (formData: FormData): Promise<UploadImageResponse> => {

    const { data } = await nestApi.post<UploadImageResponse>('file/upload', formData);

    return {
        url: data.url
    }

}