import Image from 'next/future/image';
import { PostImage } from '../lib/api';

const PostImage: React.FC<{ image: PostImage, onClick: () => void, className?: string }> = ({ image, onClick, className }) => {
	return (
		<div className={`overflow-hidden cursor-pointer ${className ?? '' }`}>
			<Image
				onClick={onClick}
				src={image.src}
				placeholder={image.blurDataURL ? 'blur' : undefined}
				blurDataURL={image.blurDataURL}
				alt=''
				className='duration-700 ease-in-out hover:scale-110 '
				sizes={
					'(max-width: 640px) 100vw' +
					',(max-width: 768px) 50vw' +
					',(max-width: 1280px) 33vw' +
					',(max-width: 1920px) 25vw'
				}
				width={image.width}
				height={image.height}
			/>
		</div>
	);
}

export default PostImage;
