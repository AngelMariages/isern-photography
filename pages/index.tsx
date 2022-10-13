import { getAllPosts, getSectionOrder, Post } from '../lib/api';
import Header from '../components/Header';
import MainImage from '../components/MainImage';
import ScrollDownArrow from '../components/ScrollDownArrow';
import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

const Gallery = dynamic(() => import('../components/layout/Gallery'), {
	ssr: false,
});

export const getStaticProps: GetStaticProps<{ allPosts: Post[], mainPost: Post, sectionOrder: string[] }> = async () => {
  const allPosts = getAllPosts();

  return {
    props: {
      allPosts: allPosts.slice(1),
      mainPost: allPosts[0],
      sectionOrder: getSectionOrder()
    }
  }
};

const Home = ({ mainPost, allPosts, sectionOrder }: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <div className='bg-[#2b2b2b]'>
      <Head>
        <title>Jordi Isern Photography</title>
      </Head>
      <Header variant='dark' sectionOrder={sectionOrder} />
      <MainImage image={mainPost.image} />
      <ScrollDownArrow toID='gallery' />
      <Gallery id="gallery" allPosts={allPosts} sectionOrder={sectionOrder} />
    </div>
  );
}

export default Home;
