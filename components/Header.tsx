import { useEffect, useState } from 'react';

const HeaderItem = ({ children }: {
	children: React.ReactNode
}) => (
	<div className='text-zinc-200 font-medium tracking-wide font mr-10'>{children}</div>
);

const Header = () => {
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
		<div className='absolute'>
			<div className='relative'>
				<div className={
					`transition-height duration-500 ease-in-out fixed bg-opacity-50 z-10 flex items-center justify-center w-full top-0 ${isSticky ? 'h-[40px] bg-gray-800' : 'h-[80px]'}`
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
