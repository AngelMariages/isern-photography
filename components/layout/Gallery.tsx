import { Post } from '../../lib/api';
import PostImage from '../PostImage';
import ImageLightbox from '../ImageLightbox';
import { useMemo, useState } from 'react';
import Masonry from 'react-masonry-css';

const GallerySectionSelector = ({ section, currentSection, onSectionChange }: { section: string, currentSection: string, onSectionChange: (section: string) => void }) => {
	return (
		<button onClick={() => onSectionChange(section)} className={`uppercase ${section === currentSection ? 'text-gray-400' : ''}`}>
			{section}
		</button>
	);
};

const Gallery = ({ allPosts, withGallery = true, sectionOrder = [] }: {
	allPosts: Post[],
	sectionOrder?: string[],
	withGallery?: boolean,
}) => {
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const images = useMemo(() => allPosts.map(post => ({ src: post.image.src, preview: post.image.blurDataURL })), [allPosts]);
	const [currentSection, setCurrentSection] = useState('all');


	const allPostsBySection = useMemo(() => {
		return allPosts.reduce((acc, post) => {
			acc[post.section] = [
				...(acc[post.section] || []),
				post,
			];
			return acc;
		}, {
			all: allPosts,
		} as Record<string, Post[]>);
	}, [allPosts]);

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
			<div className='flex gap-8 text-xl text-gray-100 my-10 justify-center'>
				<GallerySectionSelector section='all' currentSection={currentSection} onSectionChange={setCurrentSection} />
				{sectionOrder.map(section => {
					return (
						<GallerySectionSelector
							key={section}
							section={section}
							currentSection={currentSection}
							onSectionChange={setCurrentSection}
						/>
					);
				})}
			</div>
			<Masonry breakpointCols={{
				default: 4,
				1100: 3,
				700: 2,
				500: 1
			}} className="flex w-auto" >
				{allPostsBySection[currentSection].map(({ image }, id) => (
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
		</>
	);
}

export default Gallery
