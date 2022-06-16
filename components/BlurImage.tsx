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
		<div className='absolute inset-0 m-0 w-full bg-gray-200'>
			<Image
				src={post.image}
				alt={post.title}
				layout='fill'
				priority={isPriority}
				className={cn(
					'duration-700 ease-in-out group-hover:opacity-75',
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
