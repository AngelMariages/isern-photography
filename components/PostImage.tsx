import Image from 'next/future/image';
import { Post } from '../lib/api';

type PostImageProps = {
	post: Post;
	onClick: () => void;
	className?: string;
};

const PostImage: React.FC<PostImageProps> = ({ post, onClick, className, ...rest }) => {
	const { image } = post;

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
				className='duration-700 ease-in-out hover:scale-110'
				width={image.width}
				height={image.height}
				quality={100}
				sizes={
					'(max-width: 640px) 100vw' +
					',(max-width: 768px) 50vw' +
					',(max-width: 1280px) 33vw' +
					',(max-width: 1920px) 25vw'
				}
			/>
		</div>
	);
};

export default PostImage;
