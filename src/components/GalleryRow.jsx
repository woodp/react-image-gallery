import GalleryColumn from "./GalleryColumn"
import { useState, useEffect } from "react"
import AddImageForm from "./AddImageForm"
import { useImageStore } from "../hooks/images/useImageStore"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { setImages } from "../store/slices/imagesSlice"

const GalleryRow = () => {
  const [groups, setGroups] = useState([]);
  const { getAllImages } = useImageStore()
  const { user } = useSelector(state => state.auth)
  const { images } = useSelector(state => state.images)
  const dispatch = useDispatch()

  const getGroupsOfTwo = (loadedImages) => {
    const groupOfImages = []
    for (let i = 0; i < loadedImages.length; i += 2) {
      groupOfImages.push({ images: loadedImages.slice(i, i + 2), key: i })
    }
    return groupOfImages
  };

  useEffect(() => {
    getAllImages(user.email)
    .then((userImages) => {
      dispatch(setImages(userImages))
    })
    .catch((error) => toast.error(error))
  }, [])

  useEffect(() => {
    const groupsOfImages = getGroupsOfTwo(images)
    setGroups(groupsOfImages)
  }, [images])

  return (
    <>
      <div className="row">
        {groups.map((group) => (
          <GalleryColumn images={group.images} key={group.key} />
        ))}
      </div>
      <AddImageForm />
    </>
  );
};

export default GalleryRow;
