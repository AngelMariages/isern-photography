"use client";
import { useEffect } from 'react';
import { ApiImageData } from '../../pages/api/image';
import OrderPreview from './previews/OrderPreview';
import type { PreviewTemplateComponentProps } from 'netlify-cms-core';

async function getImageBase64(url: string): Promise<string> {
	const src = url.replace(/^public(.*)/, "$1");

	return new Promise((resolve) => {
		fetch(src)
			.then((res) => res.blob())
			.then((blob) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					resolve(reader.result?.toString() || "");
				};
				reader.readAsDataURL(blob);
			});
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

	const imageData = await fetch('/api/image', {
		method: 'POST',
		body: await getImageBase64(imageUrl),
	}).then(async (res) => (await res?.json()) as ApiImageData | undefined);

	if (imageData === undefined) {
		alert('error uploading image')
		return;
	}

	return entry
		.get("data")
		.set(
			"image",
			entry
				.get("data")
				.get("image")
				.set('blurDataURL', imageData.blurDataURL)
				.set("width", imageData.width)
				.set("height", imageData.height)
		);
}

const AdminPage = () => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			(async () => {
				const CMS = (await import('netlify-cms-app')).default;
				CMS.init();
				CMS.registerEventListener({
					name: "preSave",
					handler: preSaveHandler,
				});
				CMS.registerPreviewTemplate("order", (props) => {
					return <OrderPreview {...props} />;
				});
				CMS.registerPreviewStyle("/admin/main.css");
			})();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div></div>;
};

export default AdminPage;
