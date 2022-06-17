import { Post } from '../../lib/api';
import PostImage from '../PostImage';
import ImageLightbox from '../ImageLightbox';
import { useState } from 'react';

const Gallery = ({ allPosts }: {
	allPosts: Post[]
}) => {
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<>
			{isLightboxOpen && (
				<ImageLightbox
					images={allPosts.map(post => ({ src: post.image.src, preview: post.image.previewDataURL }))}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
					setIsOpen={setIsLightboxOpen}
				/>
			)}
			<div
				className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2'
				style={{
					gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
				}}
			>
				{allPosts.map(({ image }, id) => (
					<div key={id} className='relative w-full mb-2'>
						<div className='inline-flex' style={{
							paddingTop: `calc(${100 / (image.width / image.height)}% - 2px)`
						}}>
							<div>
								<PostImage
									onClick={() => {
										setIsLightboxOpen(true);
										setCurrentIndex(id);
									}}
									image={image}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default Gallery
