import { Post } from '../../lib/api';
import PostImage from '../PostImage';
import ImageLightbox from '../ImageLightbox';
import { useMemo, useState } from 'react';
import Masonry from './Masonry';

const SectionButton = ({ section, currentSection, onSectionChange }: { section: string, currentSection: string, onSectionChange: (section: string) => void }) => {
	return (
		<button onClick={() => onSectionChange(section)} className={`uppercase ${section === currentSection ? 'text-gray-400' : ''}`}>
			{section}
		</button>
	);
};

const SectionSelector = ({ sectionOrder, currentSection, setCurrentSection }: { sectionOrder: string[], currentSection: string, setCurrentSection: (section: string) => void }) => {
	if (!sectionOrder.length) {
		return null;
	}

	return (
		<div className='flex flex-wrap gap-8 text-xl text-gray-100 my-10 mx-3 justify-center'>
			<SectionButton section='all' currentSection={currentSection} onSectionChange={setCurrentSection} />
			{sectionOrder.map(section => {
				return (
					<SectionButton
						key={section}
						section={section}
						currentSection={currentSection}
						onSectionChange={setCurrentSection}
					/>
				);
			})}
		</div>
	);
}

const Gallery = ({ allPosts, withGallery = true, sectionOrder = [], id }: {
	allPosts: Post[],
	sectionOrder?: string[],
	withGallery?: boolean,
	id?: string
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
		<div id={id}>
			{withGallery && isLightboxOpen && (
				<ImageLightbox
					images={images}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
					setIsOpen={setIsLightboxOpen}
				/>
			)}
			<SectionSelector sectionOrder={sectionOrder} currentSection={currentSection} setCurrentSection={setCurrentSection} />
			<Masonry className="flex w-auto snap-mandatory snap-y">
				{allPostsBySection[currentSection].map((post, index) => (
					<PostImage
						key={post.slug}
						onClick={() => {
							setIsLightboxOpen(true);
							setCurrentIndex(index);
						}}
						className="will-change-transform snap-start"
						post={post}
					/>
				))}
			</Masonry>
		</div>
	);
}

export default Gallery
