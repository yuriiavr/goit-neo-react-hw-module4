import Modal from 'react-modal';
import css from './ImageModal.module.css';

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      contentLabel="Image Modal"
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || "Image"}
        className={css.modalImage}
      />
      <div className={css.imageDetails}>
        {image.alt_description && <p>{image.alt_description}</p>}
        <div className={css.imageInfo}>
          <p>Author: {image.user.name}</p>
          <p>Likes: {image.likes}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;