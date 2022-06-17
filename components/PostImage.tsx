import Image from 'next/image';
import { Post, PostImage } from '../lib/api';

const PostImage: React.FC<{ image: PostImage, onClick: () => void }> = ({ image, onClick }) => {
	return (
		<div className='absolute inset-0 mb-0 w-full bg-gray-200 cursor-pointer' onClick={() => onClick()}>
			<Image
				src={image.src}
				placeholder='blur'
				blurDataURL={image.previewDataURL}
				alt=''
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
