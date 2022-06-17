import Image from 'next/image';
import { Post } from '../lib/api';

const PostImage: React.FC<{ post: Post, onClick: () => void }> = ({ post, onClick }) => {
	return (
		<div className='absolute inset-0 m-0 w-full bg-gray-200 cursor-pointer' onClick={() => onClick()}>
			<Image
				src={post.image}
				placeholder='blur'
				blurDataURL={post.blurSrc}
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
				className='duration-700 ease-in-out hover:scale-110'
			/>
		</div>
	);
}

export default PostImage;
