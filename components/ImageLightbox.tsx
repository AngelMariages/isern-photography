import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const ImageLightbox: React.FC<{ images: string[]; currentIndex: number; setCurrentIndex: Function, setIsOpen: Function }> = ({ images, currentIndex, setCurrentIndex, setIsOpen }) => {
	return (
		<Lightbox
			mainSrc={images[currentIndex]}
			nextSrc={images[(currentIndex + 1) % images.length]}
			prevSrc={images[(currentIndex + images.length - 1) % images.length]}
			onCloseRequest={() => setIsOpen(false)}
			onMovePrevRequest={() => setCurrentIndex((currentIndex + images.length - 1) % images.length)}
			onMoveNextRequest={() => setCurrentIndex((currentIndex + 1) % images.length)}
		/>
	);
};

export default ImageLightbox;
