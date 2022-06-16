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
      className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2.5 grid-cols-4 p-0 m-0'
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      }}
    >
      {allPosts.map((post, id) => (
        <div key={id} className='relative w-full'>
          <div className='inline-flex' style={{
            paddingTop: `${100 / (post.imageWidth / post.imageHeight)}%`
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

const shuffle = (a: any[]) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      allPosts: shuffle([...allPosts.concat(allPosts).concat(allPosts)])
    }
  }
}

export default Home
