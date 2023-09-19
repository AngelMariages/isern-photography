import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export type ApiImageData = {
	width: number;
	height: number;
	blurDataURL: string;
};

async function parseImage(dataUrl: string): Promise<ApiImageData> {
	const base64Data = dataUrl.split("base64,").pop();

	if (!base64Data) {
		throw new Error("Invalid base64 data");
	}

	const buffer = Buffer.from(base64Data, "base64");
	const image = sharp(buffer);
	const metadata = await image.metadata();

	return {
		width: metadata.width!,
		height: metadata.height!,
		blurDataURL: await getBlurImgFromBase64DataUrl(image, metadata),
	};
}

async function getBlurImgFromBase64DataUrl(
	image: sharp.Sharp,
	metadata: sharp.Metadata
): Promise<string> {
	const placeholderImgWidth = 100;
	const imgAspectRatio = metadata.width! / metadata.height!;
	const placeholderImgHeight = Math.round(placeholderImgWidth / imgAspectRatio);

	return await image
		.resize({ width: placeholderImgWidth, height: placeholderImgHeight })
		.blur(10)
		.toBuffer()
		.then(
			(data) =>
				`data:image/${metadata.format!};base64,${data.toString("base64")}`
		);
}

export async function POST(request: NextRequest) {
	const referer = headers().get("referer");

	if (!referer?.includes("admin")) {
		return NextResponse.json({ message: "Not found" }, { status: 404 });
	}

	const imageDataUrl = await request.text();

	if (!imageDataUrl || !imageDataUrl.startsWith("data:image")) {
		return NextResponse.json({ message: "Invalid image" }, { status: 400 });
	}

	return NextResponse.json(await parseImage(imageDataUrl));
}
