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
    <>
      {isLightboxOpen && (
        <ImageLightbox
          images={allPosts.map(post => ({ src: post.image.src, preview: post.image.previewDataURL }))}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsOpen={setIsLightboxOpen}
        />
      )}
      <div
        className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-0'
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        }}
      >
        {allPosts.map(({ image }, id) => (
          <div key={id} className='relative w-full'>
            <div className='inline-flex' style={{
              paddingTop: `calc(${100 / (image.width / image.height)}% - 10px)`
            }}>
              <PostImage
                onClick={() => {
                  setIsLightboxOpen(true);
                  setCurrentIndex(id);
                }}
                image={image}
              />
            </div>
          </div>
        ))}
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

export default Home
