import Image from 'next/image';
import { PostImage } from '../lib/api'

const MainImage = ({ image }: {
	image: PostImage
}) => {

	return (
		<div className='w-full relative h-screen'>
			<Image
				src={image.src}
				alt='Main image'
				blurDataURL={image.previewDataURL}
				layout='fill'
				objectFit='cover'
			/>
		</div>
	);
}

export default MainImage;
