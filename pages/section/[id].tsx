import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Gallery from '../../components/layout/Gallery';
import { getAllPosts, Post } from '../../lib/api';

const SECTIONS = {
	retrato: 'Retrato',
	producto: 'Producto',
	lookBook: 'Look-book'
};

const Section = ({ allPosts }: {
	allPosts: Post[];
}) => {
	const router = useRouter();
	const { id } = router.query as { id: keyof typeof SECTIONS };
	const title = `Jordi Isern Photography - ${SECTIONS[id]}`;


	return (
		<div className='bg-gray-300'>
			<Head>
				<title>{title}</title>
			</Head>
			<Header variant='light' />
			<div className='mx-4 pt-[8rem]'>
				<div className='py-4 pl-4 mt-10 mb-12 bg-gray-500 text-xl capitalize font-semibold'>
					{id}
				</div>
				<Gallery allPosts={allPosts} />
			</div>
		</div>
	);
};

export async function getStaticPaths() {
	return {
		paths: Object.keys(SECTIONS).map((section) => ({
			params: { id: section }
		})),
		fallback: false
	}
}

export async function getStaticProps({ params: { id } }: { params: { id: string } }) {
	return {
		props: {
			allPosts: await getAllPosts(id),
		}
	}
}

export default Section;
