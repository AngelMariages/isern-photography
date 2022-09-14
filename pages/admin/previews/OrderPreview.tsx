/* eslint-disable @next/next/no-img-element */
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

type OrderPreviewProps = PreviewTemplateComponentProps & {
	allPosts: Post[];
}

const OrderPreview: React.FC<OrderPreviewProps> = ({ entry, allPosts }) => {
	const [postsList, setPostsList] = useState<Post[]>([]);

	const { postOrderList } = entry.get("data").toJS();

	useEffect(() => {
		const postSlugs: string[] = postOrderList.map(({ postSlug }: { postSlug: string }) => postSlug);

		setPostsList(
			postSlugs.map((slug) => allPosts.find((post) => post.slug === slug)).filter(Boolean) as Post[]
		)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(postOrderList)]);


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
