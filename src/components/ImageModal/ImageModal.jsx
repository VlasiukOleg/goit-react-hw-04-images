import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalBackdrop, Modal } from './ImageModal.styled';

export const ImageModal = ({
  handleBackdropClick,
  onCloseModal,
  largeImageURL,
  tags,
}) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <Modal>
        <img src={largeImageURL} alt={tags} />
      </Modal>
    </ModalBackdrop>
  );
};

ImageModal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handleBackdropClick: PropTypes.func.isRequired,
};
