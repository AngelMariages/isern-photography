import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDir = join(process.cwd(), '_posts');
const configDir = join(process.cwd(), '_config');

export type PostImage = {
	src: string;
	width: number;
	height: number;
	blurDataURL?: string;
}

export type Post = {
	title: string;
	slug: string;
	section: string;
	tags: string[];
	image: PostImage;
}

const POST_FIELDS = ['title', 'slug', 'tags', 'section', 'image'];


function getPostSlugs(): string[] {
	return readdirSync(postsDir);
}

type Config = {
	postOrderList: {
		postSlug: string;
	}[];
	sectionOrderList: {
		sectionName: string;
	}[];
}

function getPostsOrder(): string[] {
	const orderFile = join(configDir, 'order.md');
	const order = readFileSync(orderFile, 'utf8');
	const out = matter(order);
	const config = out.data as Config;

	return config.postOrderList.map((post) => post.postSlug);
}

export function getSectionOrder(): string[] {
	const orderFile = join(configDir, 'order.md');
	const order = readFileSync(orderFile, 'utf8');
	const out = matter(order);
	const config = out.data as Config;

	return config.sectionOrderList.map((section) => section.sectionName);
}

export function getPostBySlug(slug: string) {
	try {
		const realSlug = slug.replace(/\.md$/, '');
		const fullPath = join(postsDir, `${realSlug}.md`);
		const fileContents = readFileSync(fullPath, 'utf8');
		const out = matter(fileContents);
		const data = out.data as Post;

		const post = {} as Post;

		POST_FIELDS.map((field) => {
			const postField = field as keyof Post;

			if (postField === 'slug') {
				post[postField] = realSlug;
			}

			if (data[postField] !== undefined) {
				// @ts-ignore
				post[postField] = data[postField];
			}
		});

		post.image = {
			src: data.image.src,
			width: parseInt(`${data.image.width}`, 10),
			height: parseInt(`${data.image.height}`, 10),
			blurDataURL: data.image.blurDataURL
		};

		return post;
	} catch {
		return null;
	}
}

export function getAllPosts(section?: string): Post[] {
	const slugs = getPostSlugs();
	const posts = slugs.map(getPostBySlug).filter(Boolean) as Post[];

	if (section) {
		return posts.filter((post) => post.section.includes(section));
	} else {
		const order = getPostsOrder();

		return posts.filter((post) => order.includes(post.slug)).sort((a, b) => {
			const aIndex = order.indexOf(a.slug);
			const bIndex = order.indexOf(b.slug);

			if (aIndex < bIndex) {
				return -1;
			}

			if (aIndex > bIndex) {
				return 1;
			}

			return 0;
		});
	}

	return posts;
}
