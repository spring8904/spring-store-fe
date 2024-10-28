import api from '../config/api'

export const deleteImagesCloudinary = async (urls) => {
  if (!urls.length) return
  return await api.post(`/cloudinary/delete`, { urls })
}
