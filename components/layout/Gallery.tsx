import { Post } from '../../lib/api';
import PostImage from '../PostImage';
import ImageLightbox from '../ImageLightbox';
import { useMemo, useState } from 'react';
import Masonry from 'react-masonry-css';

const Gallery = ({ allPosts, withGallery = true }: {
	allPosts: Post[],
	withGallery?: boolean,
}) => {
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const images = useMemo(() => allPosts.map(post => ({ src: post.image.src, preview: post.image.blurDataURL })), [allPosts])

	return (
		<>
			{withGallery && isLightboxOpen && (
				<ImageLightbox
					images={images}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
					setIsOpen={setIsLightboxOpen}
				/>
			)}
			{/* <div className='grid grid-cols-4'> */}
			<Masonry breakpointCols={{
				default: 4,
				1100: 3,
				700: 2,
				500: 1
			}} className="flex w-auto">
				{allPosts.map(({ image }, id) => (
					<PostImage
						key={id}
						onClick={() => {
							setIsLightboxOpen(true);
							setCurrentIndex(id);
						}}
						image={image}
					/>
				))}
			</Masonry>
			{/* </div> */}
		</>
	);
}

export default Gallery
