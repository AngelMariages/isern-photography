import { getAllPosts, Post } from '../lib/api';
import Gallery from '../components/layout/Gallery';
import Header from '../components/Header';
import MainImage from '../components/MainImage';

const Home = ({ allPosts }: {
  allPosts: Post[];
}) => {
  return (
    <>
      <Header />
      <MainImage image={allPosts[1].image} />
      <div className='px-2 pt-20'>
        <Gallery allPosts={allPosts} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts: [...allPosts.concat(allPosts).concat(allPosts)]
    }
  }
}

export default Home;
