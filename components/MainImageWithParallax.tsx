"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { PostImage } from "../lib/api";
import MainImage from './MainImage';

export default function MainImageWithParallax({ image }: { image: PostImage }) {
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

	return (
		<motion.div style={{ y }} className="overflow-hidden">
			<MainImage image={image} />
		</motion.div>
	);
}
