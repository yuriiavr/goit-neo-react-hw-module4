import { useEffect } from 'react';
import css from './ImageModal.module.css';

const ImageModal = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  if (!isOpen || !image) {
    return null;
  }

  return (
    <div id="modal-overlay" className={css.modalOverlay} onClick={handleOverlayClick}>
      <div className={css.modalContent}>
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
      </div>
    </div>
  );
};

export default ImageModal;