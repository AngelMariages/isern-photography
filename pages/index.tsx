import type { NextPage } from 'next'
import Image from 'next/image';
import { getAllPosts, Post } from '../lib/api';
import BlurImage from '../components/BlurImage';

type Props = {
  allPosts: Post[]
}

const Home: NextPage<Props> = ({ allPosts }) => {
  return (
    <div
      className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-0'
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      }}
    >
      {allPosts.map((post, id) => (
        <div key={id} className='relative w-full'>
          <div className='inline-flex' style={{
            paddingTop: `calc(${100 / (post.imageWidth / post.imageHeight)}% - 10px)`
          }}>
            <BlurImage
              post={post}
              isPriority={id <= 10}
            />
            {/* </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      allPosts: [...allPosts.concat(allPosts).concat(allPosts)]
    }
  }
}

export default Home
