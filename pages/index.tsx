import { getAllPosts, getSectionOrder, Post } from '../lib/api';
import Header from '../components/Header';
import MainImage from '../components/MainImage';
import Gallery from '../components/layout/Gallery';
import ScrollDownArrow from '../components/ScrollDownArrow';
import { useRef } from 'react';
import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

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
  const galleryContainerRef = useRef(null);

  return (
    <div className='bg-[#2b2b2b]'>
      <Head>
        <title>Jordi Isern Photography</title>
      </Head>
      <Header variant='dark' sectionOrder={sectionOrder} />
      <MainImage image={mainPost.image} />
      <ScrollDownArrow scrollToRef={galleryContainerRef} />
      <div ref={galleryContainerRef}>
        <Gallery allPosts={allPosts} sectionOrder={sectionOrder} />
      </div>
    </div>
  );
}

export default Home;
