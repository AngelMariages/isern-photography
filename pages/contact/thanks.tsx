import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ContactBody from '../../components/ContactBody';
import { getSectionOrder } from '../../lib/api';

export const getStaticProps: GetStaticProps<{ sectionOrder: string[] }> = async () => {
	return {
		props: {
			sectionOrder: getSectionOrder()
		}
	}
};

const Thanks = ({
	sectionOrder
}: InferGetStaticPropsType<typeof getStaticProps>) => {

	return (
		<ContactBody sectionOrder={sectionOrder}>
			<div className='text-4xl text-medium pt-20'>
				Thanks for contacting me!
				<br />
				I will get back to you as soon as possible.
			</div>
		</ContactBody>
	)
};

export default Thanks;