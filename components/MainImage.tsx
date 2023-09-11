import Image from "next/image";
import { PostImage } from "../lib/api";

export default function MainImage({ image }: { image: PostImage }) {
	return (
		<Image
			src={image.src}
			alt="Main image"
			priority
			loading="eager"
			className="object-cover w-full h-screen"
			placeholder={image.blurDataURL ? "blur" : undefined}
			blurDataURL={image.blurDataURL}
			width={image.width}
			height={image.height}
			quality={80}
		/>
	);
}
