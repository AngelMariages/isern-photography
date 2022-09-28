import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'node:stream/consumers';
import sharp from 'sharp';

export type ApiImageData = {
	width: number;
	height: number;
	blurDataURL: string;
};

async function parseImage(dataUrl: string): Promise<ApiImageData> {
	const base64Data = dataUrl.split('base64,').pop();

	if (!base64Data) {
		throw new Error('Invalid base64 data');
	}

	const buffer = Buffer.from(base64Data, 'base64');
	const image = sharp(buffer);
	const metadata = await image.metadata();

	return {
		width: metadata.width!,
		height: metadata.height!,
		blurDataURL: await getBlurImgFromBase64DataUrl(image, metadata),
	};
}

async function getBlurImgFromBase64DataUrl(image: sharp.Sharp, metadata: sharp.Metadata): Promise<string> {

	const placeholderImgWidth = 100;
	const imgAspectRatio = metadata.width! / metadata.height!;
	const placeholderImgHeight = Math.round(placeholderImgWidth / imgAspectRatio);

	return await image
		.resize({ width: placeholderImgWidth, height: placeholderImgHeight })
		.blur(10)
		.toBuffer()
		.then((data) =>
			`data:image/${metadata.format!};base64,${data.toString('base64')}`
		);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const imageDataUrl = (await buffer(req)).toString();

		if (!imageDataUrl || !imageDataUrl.startsWith('data:image')) {
			return res.status(400).json({ message: 'Invalid image' });
		}

		return res.status(200).json(await parseImage(imageDataUrl));
	}

	return res.status(400).json({ message: 'Invalid request method' });
}

export const config = {
	api: {
		bodyParser: false
	}
};
