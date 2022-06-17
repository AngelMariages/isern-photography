import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getAllPosts, Post } from '../lib/api';
import Gallery from './gallery';

const Home = ({ allPosts }: {
  allPosts: Post[];
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <>
      <div className='absolute'>
        <div className='relative'>
          <div className={
            `transition-height duration-500 ease-in-out fixed bg-opacity-50 z-10 flex items-center justify-center w-full top-0 ${isSticky ? 'h-[40px] bg-gray-800' : 'h-[80px]'}`
          }>
            <div className='font-medium tracking-wide font mr-10'>HOME</div>
            <div className='font-medium tracking-wide font mr-10'>RETRATO</div>
            <div className='font-medium tracking-wide font mr-10'>PRODUCTO</div>
            <div className='font-medium tracking-wide font mr-10'>LOOK BOOK</div>
            <div className='font-medium tracking-wide font mr-10'>CONTACTO</div>
          </div>
        </div>
      </div>
      <div className='w-full relative h-screen'>
        <Image
          src={allPosts[1].image}
          alt={allPosts[1].title}
          layout='fill'
          objectFit='cover'
          width={'100%'}
          height={'100%'}
        />
      </div>
      <Gallery allPosts={allPosts} />
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
