import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import matter from 'gray-matter';

// const POST_FIELDS = ['title', 'slug', 'tags', 'image'];

const postsDirectory = join(process.cwd(), '_posts');

export type PostImage = {
	src: string;
	width: number;
	height: number;
	previewDataURL: string;
}

export type Post = {
	title: string;
	slug: string;
	tags: string[];
	image: PostImage;
}

const POST_FIELDS = ['title', 'slug', 'tags', 'image'];


function getPostSlugs(): string[] {
	return readdirSync(postsDirectory);
}

async function getPostBySlug(slug: string) {
	const realSlug = slug.replace(/\.md$/, '');
	const fullPath = join(postsDirectory, `${realSlug}.md`);
	const fileContents = readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);

	const items = {} as Post;

	POST_FIELDS.map(async (field) => {
		if (field === 'slug') {
			items[field] = realSlug
		}

		if (data[field] !== undefined) {
			// @ts-ignore
			items[field] = data[field]
		}
	});

	if (data.image) {
		const previewDataURL = await generateBase64BlurImg(data.image.src);

		items.image = {
			src: data.image.src,
			width: parseInt(data.image.width, 10),
			height: parseInt(data.image.height, 10),
			previewDataURL
		};
	}

	return items
}

async function generateBase64BlurImg(image: string): Promise<string> {
	const imagePath = join(process.cwd(), 'public', image);
	const sharpImg = sharp(imagePath);
	const metadata = await sharpImg.metadata();

	const placeholderImgWidth = 100;
	const imgAspectRatio = metadata.width! / metadata.height!;
	const placeholderImgHeight = Math.round(placeholderImgWidth / imgAspectRatio);

	const base64BlurImg = await sharpImg
		.resize({ width: placeholderImgWidth, height: placeholderImgHeight })
		.blur(10)
		.toBuffer()
		.then((data) =>
			`data:image/${metadata.format!};base64,${data.toString('base64')}`);

	return base64BlurImg;
}

export async function getAllPosts(): Promise<Post[]> {
	const slugs = getPostSlugs();
	const posts = await Promise.all(slugs
		.map(async (slug) =>
			await getPostBySlug(slug)
		)
	);

	return posts;
}