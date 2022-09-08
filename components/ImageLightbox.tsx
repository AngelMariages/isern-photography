import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

type Image = {
	src: string;
	preview: string;
}

const ImageLightbox: React.FC<{ images: Image[]; currentIndex: number; setCurrentIndex: Function, setIsOpen: Function }> = ({ images, currentIndex, setCurrentIndex, setIsOpen }) => {
	const currentImage = images[currentIndex];
	const prevImage = images[currentIndex - 1];
	const nextImage = images[currentIndex + 1];

	return (
		<Lightbox
			mainSrc={currentImage.src}
			mainSrcThumbnail={currentImage.preview}
			nextSrc={nextImage.src}
			nextSrcThumbnail={nextImage.preview}
			prevSrc={prevImage.src}
			prevSrcThumbnail={prevImage.preview}
			onCloseRequest={() => setIsOpen(false)}
			onMovePrevRequest={() => setCurrentIndex(images.indexOf(prevImage))}
			onMoveNextRequest={() => setCurrentIndex(images.indexOf(nextImage))}
			onImageLoad={() => {
				// For React 18
				window.dispatchEvent(new Event('resize'));
			}}
		/>
	);
};

export default ImageLightbox;
