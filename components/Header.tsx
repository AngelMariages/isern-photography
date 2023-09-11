"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

const sections = {
	retrato: {
		name: "RETRATO",
		path: "/section/retrato",
	},
	producto: {
		name: "PRODUCTO",
		path: "/section/producto",
	},
	lookBook: {
		name: "LOOK-BOOK",
		path: "/section/lookBook",
	},
	fotosFamilia: {
		name: "FOTOS FAMILIA",
		path: "/section/fotosFamilia",
	},
};

const HeaderItem: React.FC<{
	title: string;
	href: string;
	variant: "light" | "dark";
}> = ({ title, href, variant }) => {
	return (
		<NavLink
			href={href}
			title={title}
			className="block cursor-pointer min-w-[6.3rem] text-center font-medium tracking-wide font"
			activeClassName={variant === "dark" ? "text-[#FFF]" : "text-black"}
			inactiveClassName={`${
				variant === "dark" ? "text-[#c7c7c7]" : "text-[#999]"
			}`}
		/>
	);
};

const getHeaderTransform = (index: number) => {
	return `${(6.3 + 2.5) * (index - 2)}rem`;
};

const getVariant = (asPath: string) => {
	if (asPath === "/") {
		return "dark";
	}

	if (asPath.startsWith("/contact")) {
		return "dark";
	}

	return "light";
};

export default function Header({ sectionOrder }: { sectionOrder: string[] }) {
	const asPath = usePathname();
	const variant = getVariant(asPath ?? "");
	const currentIndex = sectionOrder.findIndex(
		(section) => asPath === sections[section as keyof typeof sections].path
	);

	return (
		<div className="z-10 absolute w-full">
			<div className="relative">
				<Link href="/" rel="home" title="Isern photography">
					<h1
						className={`cursor-pointer block ml-[60px] pt-8 z-20 fixed transition-colors ${
							variant === "dark" ? "text-[#FFF]" : "text-black"
						}`}
					>
						<div className="font-medium text-4xl">Isern</div>
						<div className="uppercase font-normal text-xxs"> photography</div>
					</h1>
				</Link>
				<div
					className={
						"z-10 flex justify-center w-screen top-0" +
						" md:flex-row md:text-base md:h-[120px] md:items-center md:flex" +
						" hidden flex-col items-end h-[100vh] gap-5 pl-36 lg:pl-0 lg:gap-10 text-3xl tracking-wide bg-transparent" +
						` ${
							variant === "dark"
								? "md:bg-gradient-to-b from-[#171717] to-transparent"
								: "md:bg-transparent"
						}`
					}
				>
					{sectionOrder.map((rawSection) => {
						const section = rawSection as keyof typeof sections;

						if (!sections[section]) {
							return null;
						}

						const { name, path } = sections[section];

						return (
							<HeaderItem
								key={section}
								title={name}
								href={path}
								variant={variant}
							/>
						);
					})}
					<HeaderItem variant={variant} href="/contact" title="CONTACTO" />
				</div>
				<div
					className={`${
						currentIndex === -1 ? "hidden" : ""
					} mx-auto border border-b border-black w-[6.3rem] transition-transform`}
					style={{
						transform: `translate3d(${getHeaderTransform(
							currentIndex
						)}, -40px, 0)`,
					}}
				/>
			</div>
		</div>
	);
}
