'use client';
import { Post } from '../../lib/api';
import PostImage from '../PostImage';
import ImageLightbox from '../ImageLightbox';
import { useMemo, useState } from 'react';
import Masonry from './Masonry';

const Gallery = ({ allPosts, withGallery = true, id }: {
	allPosts: Post[],
	withGallery?: boolean,
	id?: string
}) => {
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const images = useMemo(() => allPosts.map(post => ({ src: post.image.src, preview: post.image.blurDataURL })), [allPosts]);

	return (
		<div id={id}>
			{withGallery && isLightboxOpen && (
				<ImageLightbox
					images={images}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
					setIsOpen={setIsLightboxOpen}
				/>
			)}
			<Masonry className="flex w-auto gap-1">
				{allPosts.map((post, index) => (
					<PostImage
						key={post.slug}
						onClick={() => {
							setIsLightboxOpen(true);
							setCurrentIndex(index);
						}}
						className="will-change-transform mb-1"
						post={post}
					/>
				))}
			</Masonry>
		</div>
	);
}

export default Gallery;
