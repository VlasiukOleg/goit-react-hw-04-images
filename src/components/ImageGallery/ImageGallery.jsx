import PropTypes from 'prop-types';

import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  console.log(images);
  console.log(2 + '2');
  return (
    <>
      <GalleryList id="gallery">
        {images.map((image, index) => (
          <ImageGalleryItem
            key={index}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            tags={image.tags}
          />
        ))}
      </GalleryList>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
