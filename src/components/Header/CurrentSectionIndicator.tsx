"use client";
import { useRouter } from 'next/router';
import { sections } from '.';

const getHeaderTransform = (index: number) => {
	return `${(6.3+2.5) * (index - 2)}rem`;
};

const CurrentSectionIndicator: React.FC<{ sectionOrder: string[] }> = ({ sectionOrder }) => {
	const { asPath } = useRouter();
	const currentIndex = sectionOrder.findIndex((section) => asPath === sections[section as keyof typeof sections].path);

	return (
		<div
			className={`${currentIndex === -1 ? 'hidden' : ''} mx-auto border border-b border-black w-[6.3rem] transition-transform`}
			style={{
				transform: `translate3d(${getHeaderTransform(currentIndex)}, -40px, 0)`,
			}}
		/>
	);
};

export default CurrentSectionIndicator;
