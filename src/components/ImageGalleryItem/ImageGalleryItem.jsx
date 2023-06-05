import { useState } from 'react';
import PropTypes from 'prop-types';

import { GalleryItem } from './ImageGalleryItem.styled';
import { ImageModal } from 'components/ImageModal/ImageModal';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toogleModal = () => {
    setIsShowModal(prevState => !prevState);
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      setIsShowModal(false);
    }
  };

  return (
    <>
      <GalleryItem onClick={toogleModal}>
        <img src={webformatURL} alt={tags} />
      </GalleryItem>
      {isShowModal && (
        <ImageModal
          tags={tags}
          largeImageURL={largeImageURL}
          handleBackdropClick={handleBackdropClick}
          onCloseModal={toogleModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
