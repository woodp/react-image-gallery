import { useDispatch, useSelector } from "react-redux"
import userAPI from "../../apis/user-api"
import axios from "axios"
import { getEnvVariables } from '../../helpers/getEnvVariables'
import { setImages } from "../../store/slices/imagesSlice"

const { VITE_CLOUDINARY_URL } = getEnvVariables();

// CustomHook para centralizar el manejo de APIs e imagenes
export const useImageStore = () => {
  const uploadPreset = 'curso-react'
  // Se lee el VITE_CLOUDINARY_URL del archivo .env
  
  const { images } = useSelector(state => state.images)
  const dispatch = useDispatch()

  // Llamada a la API Cloudinary para almacenar imagenes (fetch)
  const uploadFile = async (file) => {
    if (!file) throw new Error('No hay ningun archivo.')
    if (!file) return null
    const formData = new FormData()
    formData.append('upload_preset', uploadPreset)
    formData.append('file', file)
    try {
      const response = await axios.post(VITE_CLOUDINARY_URL, 
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.statusText !== 'OK') throw new Error('Failed to upload the image')

      return response.data.secure_url
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  // Llamada a nuestra API obtener todos las imagenes que tiene un usuario por su mail
  const getAllImages = async (email) => {
    try {
      const { data } = await userAPI.post('/images', { email: email })
      dispatch(setImages(data.images))
      return data.images
    } catch (error) {
      console.log("Error al cargar las imagenes");
      return []
    }
  }

  // Llamada a nuestra API para guardar una imagen subida por un usuario por su mail
  const saveImages = async (email, title, path) => {
    try {
      const resp = await getAllImages(email)
      const newId = `${resp.length + 1}`;
      const images = [
        ...resp,
        {
          id: newId,
          src: path,
          alt: title,
        }
      ]
      const { data } = await userAPI.put('/images', { email: email, images: images })
      return data.images
    } catch (error) {
      console.log("Error al cargar las imagenes");
      return []
    }
  }
  return {
    images,
    uploadFile,
    saveImages,
    getAllImages
  }

}
