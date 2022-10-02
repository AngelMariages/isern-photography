import Link from 'next/link';
import NavLink from './NavLink';

const HeaderItem: React.FC<{ title: string, href: string }> = ({
	title,
	href
}) => {
	return (
		<NavLink
			href={href}
			title={title}
			className='block cursor-pointer text-zinc-200 font-medium tracking-wide font mr-10'
			activeClassName='text-[#a5a5a5]'
		/>
	);
};

const Header: React.FC<{ variant: 'light' | 'dark' }> = ({ variant }) => {
	return (
		<div className='z-10 absolute'>
			<div className='relative'>
				<Link href="/" passHref rel='home' title='Isern photography'>
					<a className='cursor-pointer block ml-[60px] pt-8 z-20 fixed'>
						<div className='text-white font-medium text-4xl'>Isern</div>
						<div className='text-white uppercase font-normal text-xxs'>photography</div>
					</a>
				</Link>
				<div className={
					'transition-opacity duration-500 ease-in-out bg-opacity-50 z-10 flex items-center justify-center w-screen top-0 h-[120px]' +
					` ${variant === 'dark' ?
						'bg-gradient-to-b from-[#171717] to-transparent' :
						'bg-gradient-to-b from-[#171717] bg-[#323232]'
					}`
				}>
					<HeaderItem href="/" title="HOME" />
					<HeaderItem href='/section/retrato' title="RETRATO" />
					<HeaderItem href='/section/producto' title="PRODUCTO" />
					<HeaderItem href='/section/lookBook' title="LOOK BOOK" />
					<HeaderItem href='/contact' title="CONTACTO" />
				</div>
			</div>
		</div>
	)
};

export default Header;
