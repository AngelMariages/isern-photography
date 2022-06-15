import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const POST_FIELDS = ['title', 'slug', 'tags', 'image', 'imageWidth', 'imageHeight'];

const postsDirectory = join(process.cwd(), '_posts');

export type Post = {
	title: string;
	slug: string;
	tags: string[];
	image: string;
	imageWidth: number;
	imageHeight: number;
}

export function getPostSlugs(): string[] {
	return readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
	const realSlug = slug.replace(/\.md$/, '')
	const fullPath = join(postsDirectory, `${realSlug}.md`)
	const fileContents = readFileSync(fullPath, 'utf8')
	const { data, content } = matter(fileContents)

	const items = {} as Post;

	POST_FIELDS.forEach((field) => {
		if (field === 'slug') {
			items[field] = realSlug
		}

		if (data[field] !== undefined) {
			// @ts-ignore
			items[field] = data[field]
		}
	})

	return items
}

export function getAllPosts(): Post[] {
	const slugs = getPostSlugs();
	const posts = slugs
		.map(slug => getPostBySlug(slug))
		// .sort((post1, post2) => post1.position - post2.position);

	return posts;
}