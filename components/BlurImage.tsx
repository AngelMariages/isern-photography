import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { Post } from '../lib/api';

function cn(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const BlurImage: NextPage<{ post: Post, isPriority: boolean }> = ({ post, isPriority }) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className='absolute inset-0 m-0 w-full bg-gray-200 cursor-pointer'>
			<Image
				src={post.image}
				alt={post.title}
				sizes={
					'(max-width: 640px) 100vw' +
					',(max-width: 768px) 50vw' +
					',(max-width: 1280px) 33vw' +
					',(max-width: 1920px) 25vw'
				}
				layout='fill'
				objectFit='fill'
				loading='eager'
				priority={isPriority}
				className={cn(
					'duration-700 ease-in-out hover:scale-110',
					isLoading
						? 'scale-110 blur-2xl grayscale'
						: 'scale-100 blur-0 grayscale-0'
				)}
				onLoadingComplete={() => setIsLoading(false)}
			/>
		</div>
	);
}

export default BlurImage;
