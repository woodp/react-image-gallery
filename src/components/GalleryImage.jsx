const GalleryImage = ({src, alt}) => {
  return (
    <img
    src={src}
    className="w-100 shadow-1-strong rounded mb-4"
    alt={alt}
  />

  );
}

export default GalleryImage;