/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';

type PreviewTemplateComponentProps = import('netlify-cms-core').PreviewTemplateComponentProps;

const PreviewContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderPreview = ({ entry, getAsset }: PreviewTemplateComponentProps) => {
	const data = entry.get("data").toJS();
	const imageOrder = data.imageOrder;

	return (
		<PreviewContainer>
			{imageOrder.map(({ imageName }: { imageName: string }, index: number) => {
				const imgSrc = getAsset(imageName).url;

				return (
					<div key={index}>
						<p>{imageName}</p>
						<img
							src={imgSrc}
							alt={imageName}
							style={{ width: '70vh' }}
						/>
					</div>
				);
			})}
		</PreviewContainer>
	);
};

export default OrderPreview;
