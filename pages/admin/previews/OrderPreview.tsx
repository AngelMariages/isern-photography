import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Post } from '../../../lib/api';

type PreviewTemplateComponentProps = import('netlify-cms-core').PreviewTemplateComponentProps;

const PreviewContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Gallery = dynamic(() => import('../../../components/layout/Gallery'), {
	ssr: false,
});

type OrderPreviewProps = PreviewTemplateComponentProps;

const OrderPreview: React.FC<OrderPreviewProps> = ({ entry }) => {
	const [postsList, setPostsList] = useState<Post[]>([]);
	const [allPosts, setAllPosts] = useState<Post[]>([]);

	const { postOrderList } = entry?.get("data")?.toJS() || {};

	useEffect(() => {
		(async () => {
			setAllPosts(
				await fetch('/api/posts').then((res) => res.json()) as Post[]
			);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (postOrderList?.length && allPosts.length) {
				const postSlugs: string[] = postOrderList.map(({ postSlug }: { postSlug: string }) => postSlug);

				setPostsList(
					postSlugs.map((slug) => allPosts.find((post) => post.slug === slug)).filter(Boolean) as Post[]
				)
			}
		})();
	}, [JSON.stringify(postOrderList), allPosts]);


	return (
		<PreviewContainer>
			<Gallery
				withGallery={false}
				allPosts={postsList}
			/>
		</PreviewContainer>
	);
};

export default OrderPreview;
