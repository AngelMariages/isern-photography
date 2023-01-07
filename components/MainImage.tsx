import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PostImage } from "../lib/api";

const MainImage = ({ image }: { image: PostImage }) => {
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

	return (
		<motion.div style={{ y }}>
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
		</motion.div>
	);
};

export default MainImage;
