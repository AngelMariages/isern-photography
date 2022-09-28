import { useEffect, useState } from 'react';

const HeaderItem = ({ children }: {
	children: React.ReactNode
}) => (
	<div className='text-zinc-200 font-medium tracking-wide font mr-10'>{children}</div>
);

const Header: React.FC<{ homeUrl: string }> = ({ homeUrl }) => {
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsSticky(window.scrollY > 80);
		}

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [])

	return (
		<div className='absolute'>
			<div className='relative'>
				<a href={homeUrl} className='cursor-pointer block ml-[60px] pt-8 z-20 fixed' rel='home' title='Isern photography'>
					<div className='text-white font-medium text-4xl'>Isern</div>
					<div className='text-white uppercase font-normal text-xxs'>photography</div>
				</a>
				<div className={
					`${isSticky ? 'opacity-0' : 'opacity-1'}` +
					' pointer-events-none transition-opacity duration-500 ease-in-out bg-opacity-50 z-10 flex items-center justify-center w-screen top-0 h-[120px]' +
					' bg-gradient-to-b from-[#171717] to-transparent'
				}>
					<HeaderItem>HOME</HeaderItem>
					<HeaderItem>RETRATO</HeaderItem>
					<HeaderItem>PRODUCTO</HeaderItem>
					<HeaderItem>LOOK BOOK</HeaderItem>
					<HeaderItem>CONTACTO</HeaderItem>
				</div>
			</div>
		</div>
	)
};

export default Header;
