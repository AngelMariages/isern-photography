import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Gallery from '../../components/layout/Gallery';
import ScrollArrows from '../../components/ScrollArrows';
import { getAllPosts, getSectionOrder, Post } from '../../lib/api';

const SECTIONS = {
	retrato: 'Retrato',
	producto: 'Producto',
	lookBook: 'Look-book',
	fotosFamilia: 'Fotos familia',
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: Object.keys(SECTIONS).map((section) => ({
			params: { id: section }
		})),
		fallback: false
	}
}

export const getStaticProps: GetStaticProps<{ allPosts: Post[], sectionOrder: string[] }, { id: string }> = async ({ params }) => {
	return {
		props: {
			allPosts: getAllPosts(params?.id),
			sectionOrder: getSectionOrder()
		}
	}
}

const Section = ({ allPosts, sectionOrder }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const router = useRouter();
	const { id } = router.query as { id: keyof typeof SECTIONS };
	const title = `Jordi Isern Photography - ${SECTIONS[id]}`;

	return (
		<div className='bg-[#FFFAF7]'>
			<Head>
				<title>{title}</title>
			</Head>
			<Header variant='light' sectionOrder={sectionOrder} />
			<div className='mx-4 pt-[8rem]'>
				<Gallery allPosts={allPosts} />
			</div>
			<div className='justify-center align-middle items-center'>
				<ScrollArrows toID='' direction='up' color='black' className='mt-16 mb-8'>
					Back to top
				</ScrollArrows>
			</div>
		</div>
	);
};

export default Section;
