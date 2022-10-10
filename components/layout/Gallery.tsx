import { Post } from '../../lib/api';
import PostImage from '../PostImage';
import ImageLightbox from '../ImageLightbox';
import { useMemo, useState } from 'react';
import Masonry from './Masonry';

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
		return sectionOrder.reduce((acc, section) => {
			return {
				...acc,
				[section]: allPosts.filter(post => post.section === section),
			};
		}, {
			all: allPosts,
		} as Record<string, Post[]>);
	}, [allPosts, sectionOrder]);

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
			{sectionOrder.length ? (
				<div className='flex flex-wrap gap-8 text-xl text-gray-100 my-10 justify-center'>
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
			) : null}
			<Masonry className="flex w-auto">
				{allPostsBySection[currentSection].map((post, index) => (
					<PostImage
						key={post.slug}
						onClick={() => {
							setIsLightboxOpen(true);
							setCurrentIndex(index);
						}}
						post={post}
					/>
				))}
			</Masonry>
		</>
	);
}

export default Gallery
