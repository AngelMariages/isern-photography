import Gallery from "../../../components/layout/Gallery";
import ScrollArrows from "../../../components/ScrollArrows";
import { getAllPosts } from "../../../lib/api";

const SECTIONS = {
	retrato: "Retrato",
	producto: "Producto",
	"look-book": "Look-book",
	"fotos-familia": "Fotos familia",
};

export const generateStaticParams = () => {
	return Object.keys(SECTIONS).map((section) => ({
		id: section,
	}));
};

export const generateMetadata = ({
	params,
}: {
	params: { id: keyof typeof SECTIONS };
}) => {
	return {
		title: `Jordi Isern Photography - ${SECTIONS[params.id]}`,
	};
};

export default async function SectionPage({
	params,
}: {
	params: { id: keyof typeof SECTIONS };
}) {
	const { id } = params;
	const allPosts = getAllPosts(id);

	return (
		<>
			<div className="mx-4 pt-[8rem]">
				<Gallery allPosts={allPosts} />
			</div>
			<div className="justify-center align-middle items-center">
				<ScrollArrows
					toID=""
					direction="up"
					color="black"
					className="mt-16 mb-8"
				>
					Back to top
				</ScrollArrows>
			</div>
		</>
	);
}
