import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import './App.css'

function App() {
  const accessKey = "b4mwI47rLpHmKNJtN9Gptg1QMvczKfsXRH3k9cCehxo";

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  const searchPhotos = (newQuery) => {
    if (newQuery === "") {
      toast.error("Please enter something to search for!");
      return;
    }
    setPage(1);
    setImages([]);
    setQuery(newQuery);
    setTotalImages(0);
  };

  const loadMorePhotos = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (query === "") return;

    const fetchPhotos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: query,
              per_page: 12,
              page: page,
            },
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
          }
        );

        const newImages = response.data.results;

        if (newImages.length === 0 && page === 1) {
          toast.error("No results found for your query");
        }

        setImages((prevImages) => {
          const uniqueImages = [...prevImages, ...newImages];
          const seenIds = new Set();
          return uniqueImages.filter((image) => {
            const isDuplicate = seenIds.has(image.id);
            seenIds.add(image.id);
            return !isDuplicate;
          });
        });

        setTotalImages(response.data.total);
      } catch (err) {
        setError("An error has occurred. Please try again");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [query, page, accessKey]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="appContainer">
      <SearchBar onSubmit={searchPhotos} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && <ImageGallery images={images} onImageClick={openModal} />}
      {isLoading && <Loader />}
      {images.length > 0 && images.length < totalImages && !isLoading && <LoadMoreBtn onClick={loadMorePhotos} />}
      <ImageModal isOpen={modalIsOpen} onClose={closeModal} image={selectedImage} />
      <Toaster />
    </div>
  );
}

export default App;