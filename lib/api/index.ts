import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export type PostImage = {
	src: string;
	width: number;
	height: number;
	blurDataURL?: string;
}

export type Post = {
	title: string;
	slug: string;
	section: string[];
	tags: string[];
	image: PostImage;
}

const POST_FIELDS = ['title', 'slug', 'tags', 'section', 'image'];


function getPostSlugs(): string[] {
	return readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
	try {
		const realSlug = slug.replace(/\.md$/, '');
		const fullPath = join(postsDirectory, `${realSlug}.md`);
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

export async function getAllPosts(section?: string): Promise<Post[]> {
	const slugs = getPostSlugs();
	const posts = slugs.map(getPostBySlug).filter(Boolean) as Post[];

	if (section) {
		return posts.filter((post) => post.section.includes(section));
	}

	return posts;
}
