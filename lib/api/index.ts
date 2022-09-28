import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

// const POST_FIELDS = ['title', 'slug', 'tags', 'image'];

const postsDirectory = join(process.cwd(), '_posts');

export type PostImage = {
	src: string;
	width: number;
	height: number;
	blurDataURL: string;
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

export async function getPostBySlug(slug: string) {
	const realSlug = slug.replace(/\.md$/, '');
	const fullPath = join(postsDirectory, `${realSlug}.md`);
	const fileContents = readFileSync(fullPath, 'utf8');
	const { data } = matter(fileContents);

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
		items.image = {
			src: data.image.src,
			width: parseInt(data.image.width, 10),
			height: parseInt(data.image.height, 10),
			blurDataURL: data.image.blurDataURL
		};
	}

	return items
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
