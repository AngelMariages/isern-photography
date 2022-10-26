import { getAllPosts, getSectionOrder, Post } from '../lib/api';
import Header from '../components/Header';
import MainImage from '../components/MainImage';
import ScrollArrows from '../components/ScrollArrows';
import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Gallery from '../components/layout/Gallery';

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
    <div className='bg-[#2b2b2b] min-h-screen'>
      <Head>
        <title>Jordi Isern Photography</title>
      </Head>
      <Header variant='dark' sectionOrder={sectionOrder} />
      <MainImage image={mainPost.image} />
      <ScrollArrows toID='gallery' direction='down' className='absolute bottom-10 left-[calc(50%_-_16px)]' />
      <Gallery id="gallery" allPosts={allPosts} />
      <ScrollArrows toID='' direction='up' className='mt-16 pb-8' />
    </div>
  );
}

export default Home;
