import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
	href: string;
	title: string;
	className: string;
	activeClassName: string;
	inactiveClassName: string;
};

const NavLink: React.FC<NavLinkProps> = ({
	href,
	title,
	className,
	activeClassName,
	inactiveClassName,
}) => {
	// const pathname = usePathname();
	const pathname = 'hola';

	const isActive = pathname === href;

	return (
		<Link href={href} className={`${isActive ? activeClassName : inactiveClassName} ${className}`}>
			{title}
		</Link>
	);
};

export default NavLink;