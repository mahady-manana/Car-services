import axios from 'axios';
// Cloudinary API
// Store image in cloudinary.
export const Cloudinary = async (file: any) => {
  const API_BASE_URL =
    process.env.CLOUDINARY_UPLOAD_URI ||
    'https://api.cloudinary.com/v1_1/mahadymanana/image/upload';
  const PRESET = 'upload_profile';
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', PRESET);
    const upload = await axios.post(API_BASE_URL, formData);
    return upload.data;
  } catch (error) {
    console.log(error);
  }
};
