import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Post } from '../../../lib/api';

type OrderPreviewProps = import('netlify-cms-core').PreviewTemplateComponentProps;

const Gallery = dynamic(() => import('../../../components/layout/Gallery'), {
	ssr: false,
});

const OrderPreview: React.FC<OrderPreviewProps> = (props) => {
	const [postsList, setPostsList] = useState<Post[]>([]);
	const [allPosts, setAllPosts] = useState<Post[]>([]);
	const [mainPost, setMainPost] = useState<Post>();

	const { postOrderList } = props.entry?.get("data")?.toJS() || {};

	useEffect(() => {
		(async () => {
			setAllPosts(await fetch('/api/posts').then((res) => res.json()) as Post[]);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (postOrderList?.length && allPosts.length) {
				const postSlugs: string[] = postOrderList.map(({ postSlug }: { postSlug: string }) => postSlug);

				const posts = postSlugs.map((slug) => allPosts.find((post) => post.slug === slug)).filter(Boolean) as Post[]

				setMainPost(posts[0]);
				setPostsList(posts.slice(1));
			}
		})();
	}, [JSON.stringify(postOrderList), allPosts]);


	return (
		<div className='flex flex-col items-center'>
			<div>Main post:</div>
			{mainPost && <Gallery withGallery={false} allPosts={[mainPost]} />}
			<div>Gallery:</div>
			<Gallery
				withGallery={false}
				allPosts={postsList}
			/>
		</div>
	);
};

export default OrderPreview;
