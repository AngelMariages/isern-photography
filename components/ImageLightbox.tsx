import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

type Image = {
	src: string;
	preview: string;
}

const ImageLightbox: React.FC<{ images: Image[]; currentIndex: number; setCurrentIndex: Function, setIsOpen: Function }> = ({ images, currentIndex, setCurrentIndex, setIsOpen }) => {
	return (
		<Lightbox
			mainSrc={images[currentIndex].src}
			mainSrcThumbnail={images[currentIndex].preview}
			nextSrc={images[(currentIndex + 1) % images.length].src}
			nextSrcThumbnail={images[(currentIndex + 1) % images.length].preview}
			prevSrc={images[(currentIndex + images.length - 1) % images.length].src}
			prevSrcThumbnail={images[(currentIndex + images.length - 1) % images.length].preview}
			onCloseRequest={() => setIsOpen(false)}
			onMovePrevRequest={() => setCurrentIndex((currentIndex + images.length - 1) % images.length)}
			onMoveNextRequest={() => setCurrentIndex((currentIndex + 1) % images.length)}
		/>
	);
};

export default ImageLightbox;
