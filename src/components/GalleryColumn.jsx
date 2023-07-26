import GalleryImage from "./GalleryImage";

const GalleryColumn = ({ images }) => {

  return (
    <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
      {images.map((image) => (
        <GalleryImage src={image.src} alt={image.alt} key={image.id} />
      ))}
    </div>
  );
};

export default GalleryColumn;
