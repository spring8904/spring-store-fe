import instance from '../config/axiosConfig'

export const deleteImagesCloudinary = async (urls) => {
  if (!urls.length) return
  return await instance.post(`/cloudinary/delete`, { urls })
}
