import { getAllPosts, Post } from '../lib/api';
import Header from '../components/Header';
import MainImage from '../components/MainImage';
import Gallery from '../components/layout/Gallery';
import ScrollDownArrow from '../components/ScrollDownArrow';
import { useRef } from 'react';

const Home = ({ mainPost, allPosts }: {
  mainPost: Post;
  allPosts: Post[];
}) => {
  const galleryContainerRef = useRef(null);

  return (
    <div className='bg-[#2b2b2b]'>
      <Header homeUrl='https://test.isern-photography.com/' />
      <MainImage image={mainPost.image} />
      <ScrollDownArrow scrollToRef={galleryContainerRef} />
      <div ref={galleryContainerRef} className='mx-2 pt-20'>
        <Gallery allPosts={allPosts} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts: allPosts.slice(1),
      mainPost: allPosts[0]
    }
  }
}

export default Home;
