import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
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
		<div className='bg-gray-300'>
			<Head>
				<title>Jordi Isern Photography - Contact</title>
			</Head>
			<Header variant='light' sectionOrder={sectionOrder} />
			<div className='pt-[8rem] h-screen bg-cover pl-20 text-gray-300' style={{
				backgroundImage: 'url(/contact-bg.jpg)',
			}}>
				<div className='text-4xl text-medium pt-20'>
					Thanks for contacting me!
					<br />
					I will get back to you as soon as possible.
				</div>
			</div>
		</div>
	)
};

export default Thanks;