import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { getAllPosts, Post } from '../../lib/api';
import OrderPreview from './previews/OrderPreview';
type PreviewTemplateComponentProps = import('netlify-cms-core').PreviewTemplateComponentProps;

type ImageSize = {
	width: number;
	height: number;
}

async function getNaturalImageSize(url: string): Promise<ImageSize> {
	return new Promise((resolve) => {
		const img = new Image();
		img.src = url.replace(/^public(.*)/, "$1");
		img.onload = () => {
			resolve({
				width: img.naturalWidth,
				height: img.naturalHeight,
			});
		};
	});
}

type PreSaveProps = {
	entry: PreviewTemplateComponentProps["entry"];
}

async function preSaveHandler({ entry }: PreSaveProps) {
	const rawImage = entry.get("data").get("image");

	if (!rawImage) {
		return entry.get("data");
	}

	const image = rawImage.toJSON();
	const mediaFiles = entry.get("mediaFiles").toJSON();

	const mediaFile = mediaFiles.find(
		(mf: { path: string }) => mf.path.replace(/^public(.*)/, "$1") === image.src
	);

	let imageUrl = mediaFile.path;

	if (mediaFile.draft) {
		imageUrl = mediaFile.url;
	}

	const dimensions = await getNaturalImageSize(imageUrl);

	return entry
		.get("data")
		.set(
			"image",
			entry
				.get("data")
				.get("image")
				.set("width", dimensions.width)
				.set("height", dimensions.height)
		);
}

const AdminPage = ({ allPosts }: { allPosts: Post[]}) => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			(async () => {
				const CMS = (await import('netlify-cms-app')).default;
				CMS.init();
				CMS.registerEventListener({
					name: "preSave",
					handler: preSaveHandler,
				});
				CMS.registerPreviewTemplate("postsOrder", (props) => {
					return <OrderPreview {...props} allPosts={allPosts} />;
				});
				CMS.registerPreviewStyle("/admin/main.css");
			})();
		}
	}, []);

	return <div></div>;
};


export async function getStaticProps() {
	const allPosts = await getAllPosts();

	return {
		props: {
			allPosts
		}
	}
}


export default AdminPage;
