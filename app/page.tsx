import Header from '../components/Header';
import Gallery from '../components/layout/Gallery';
import MainContainer from '../components/MainContainer';
import MainImage from '../components/MainImage';
import ScrollArrows from '../components/ScrollArrows';
import { getAllPosts, getSectionOrder } from '../lib/api';

export const metadata = {
	title: "Jordi Isern photography",
	description: "Fotógrafo profesional de moda y producto. Basado en Barcelona.",
	openGraph: {
		type: "website",
		locale: "es_ES",
		url: "https://isern-photography.com",
		title: "Jordi Isern photography",
		description:
			"Fotógrafo profesional de moda y producto. Basado en Barcelona.",
	},
	robots: {
		follow: true,
		index: true,
	},
};

export default async function HomePage() {
	const allPosts = getAllPosts();
	const mainPost = allPosts[0];
	const sectionOrder = getSectionOrder();

	return (
		<MainContainer>
			<Header variant="dark" sectionOrder={sectionOrder} />
			<MainImage image={mainPost.image} />
			<ScrollArrows
				toID="gallery"
				direction="down"
				className="absolute bottom-10 left-[calc(50%_-_16px)]"
			/>
			<Gallery id="gallery" allPosts={allPosts.slice(1)} />
			<ScrollArrows toID="" direction="up" className="mt-16 pb-8" />
		</MainContainer>
	);
}
