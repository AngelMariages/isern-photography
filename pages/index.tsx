import type { NextPage } from 'next'
import { getAllPosts, Post } from '../lib/api';
import PostImage from '../components/PostImage';
import ImageLightbox from '../components/ImageLightbox';
import { useState } from 'react';

type Props = {
  allPosts: Post[]
}

const Home: NextPage<Props> = ({ allPosts }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div
      className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-0'
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      }}
    >
      <>
        {isLightboxOpen && (
          <ImageLightbox
            images={allPosts.map(post => post.image)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setIsOpen={setIsLightboxOpen}
          />
        )}
        {allPosts.map((post, id) => (
          <div key={id} className='relative w-full'>
            <div className='inline-flex' style={{
              paddingTop: `calc(${100 / (post.imageWidth / post.imageHeight)}% - 10px)`
            }}>
              <PostImage
                onClick={() => {
                  setIsLightboxOpen(true);
                  setCurrentIndex(id);
                }}
                post={post}
              />
            </div>
          </div>
        ))}
      </>
    </div>
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

export default Home
