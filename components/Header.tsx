import Link from 'next/link';
import NavLink from './NavLink';

const sections = {
	retrato: {
		name: 'RETRATO',
		path: '/section/retrato',
	},
	producto: {
		name: 'PRODUCTO',
		path: '/section/producto',
	},
	lookBook: {
		name: 'LOOK-BOOK',
		path: '/section/lookBook',
	},
	fotosFamilia: {
		name: 'FOTOS FAMILIA',
		path: '/section/fotosFamilia',
	},
}

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

const Header: React.FC<{ variant: 'light' | 'dark', sectionOrder: string[] }> = ({ variant, sectionOrder }) => {
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
					'z-10 flex justify-center w-screen top-0 ' +
					' md:flex-row md:text-base md:h-[120px] md:items-center md:bg-opacity-50 md:flex' +
					' hidden flex-col items-end h-[100vh] gap-3 text-3xl tracking-wide mr-10 bg-[#171717]' +
					` ${variant === 'dark' ?
						'md:bg-gradient-to-b from-[#171717] to-transparent' :
						'md:bg-[#323232]'
					}`
				}>

					<HeaderItem href="/" title="HOME" />
					{sectionOrder.map((section) => {
						if (!sections[section as keyof typeof sections]) return null;

						const { name, path } = sections[section as keyof typeof sections];

						return (
							<HeaderItem
								key={section}
								title={name}
								href={path}
							/>
						);
					})}
					<HeaderItem href='/contact' title="CONTACTO" />
				</div>
			</div>
		</div>
	)
};

export default Header;
