import Link from 'next/link';
import { useRouter } from 'next/router';

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
	const { asPath } = useRouter();

	const isActive = asPath === href;

	return (
		<Link href={href} passHref className={`${isActive ? activeClassName : inactiveClassName} ${className}`}>
			{title}
		</Link>
	);
};

export default NavLink;