import type { NextPage } from 'next'
import Image from 'next/image';
import { getAllPosts, Post } from '../lib/api';
import { JustifiedGrid } from '@egjs/react-grid';

type Props = {
  allPosts: Post[]
}

const Home: NextPage<Props> = ({ allPosts }) => {
  return (
    <JustifiedGrid
      className='overflow-hidden'
      gap={5}
      defaultDirection={'end'}
      align={'center'}
      columnRange={[1, 4]}
      sizeRange={[200, 1000]}
      isCroppedSize={false}
      displayedRow={-1}
    >
      {allPosts.map((post, id) => (
        <div key={id} className='relative w-full'>
          <Image
            src={post.image}
            alt={post.title}
            width={post.imageWidth}
            height={post.imageHeight}
            layout={'fill'}
          />
        </div>
      ))}
    </JustifiedGrid>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      allPosts,
    }
  }
}

export default Home
