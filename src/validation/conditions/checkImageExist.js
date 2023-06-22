import { BASE_URL, photosApiUrl } from "../../config/urls";

export const checkImageExist = (imageId, imageType) => {
  return imageType ? `${BASE_URL}${photosApiUrl}/${imageId}` : null;
};
