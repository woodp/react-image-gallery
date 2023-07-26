import GalleryColumn from "./GalleryColumn";
import { useState, useEffect } from "react";
import AddImageForm from "./AddImageForm";
import { useImageStore } from "../hooks/images/useImageStore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const GalleryRow = () => {
  const [groups, setGroups] = useState([]);
  const { getAllImages } = useImageStore()
  const { user } = useSelector(state => state.auth)

  const getGroupsOfTwo = (images) => {
    const groupOfImages = [];
    for (let i = 0; i < images.length; i += 2) {
      groupOfImages.push({ images: images.slice(i, i + 2), key: i });
    }
    return groupOfImages;
  };

  useEffect(() => {
    getAllImages(user.email)
    .then((images) => {
      console.log(images)
      const groupsOfImages = getGroupsOfTwo(images);
      setGroups(groupsOfImages);  
    })
    .catch((error) => toast.error(error))
  }, []);

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
