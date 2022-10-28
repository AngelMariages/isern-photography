import Image from 'next/image';
import { useState } from 'react';
import { Post } from '../../lib/api';

type PostImageProps = {
	post: Post;
	onClick: () => void;
	className?: string;
};

const PostImage: React.FC<PostImageProps> = ({ post, onClick, className, ...rest }) => {
	const { image } = post;
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<div
			className={`overflow-hidden cursor-pointer ${className ?? ''}`}
			{...rest}
		>
			<Image
				src={image.src}
				onClick={onClick}
				placeholder={image.blurDataURL ? 'blur' : undefined}
				blurDataURL={image.blurDataURL}
				alt={post.title}
				className={`duration-700 ease-in-out hover:scale-110 ${!isLoaded ? 'animate-pulse' : ''}`}
				onLoadingComplete={() => setIsLoaded(true)}
				width={image.width}
				height={image.height}
				quality={80}
				sizes={
					'(max-width: 576px) 100vw' +
					',(max-width: 768px) 50vw' +
					',(max-width: 1200px) 33vw' +
					',(max-width: 1920px) 25vw'
				}
			/>
		</div>
	);
};

export default PostImage;
