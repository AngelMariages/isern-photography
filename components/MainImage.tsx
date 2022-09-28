import Image from 'next/future/image';
// import Image from 'next/image';
import { PostImage } from '../lib/api'

const MainImage = ({ image }: {
	image: PostImage
}) => {

	return (
		<Image
			src={image.src}
			alt='Main image'
			priority
			loading='eager'
			className='object-cover w-full h-screen'
			placeholder='blur'
			blurDataURL={image.blurDataURL}
			width={image.width}
			height={image.height}
		/>
	);
}

export default MainImage;
