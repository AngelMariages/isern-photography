import Link from 'next/link';
import { useRouter } from 'next/router';

type NavLinkProps = {
	href: string;
	title: string;
	className: string;
	activeClassName: string;
};

const NavLink: React.FC<NavLinkProps> = ({
	href,
	title,
	className,
	activeClassName
}) => {
	const { asPath } = useRouter();

	const isActive = asPath === href;

	return (
		<Link href={href} passHref>
			<a className={`${className} ${isActive ? activeClassName : ''}`}>{title}</a>
		</Link>
	);
};

export default NavLink;