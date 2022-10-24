import { useMemo } from 'react';

const ScrollArrow = ({
	className,
	direction,
	color,
}: {
	className: string,
	direction: 'up' | 'down';
	color: 'white' | 'black';
}) => {
	return (
		<div className={
			`w-[32px] h-[32px] border-solid border-${color} -rotate-45 -mb-3 animate-pulseArrow mx-auto `
			+ `${direction === 'down' ? 'border-b border-l' : 'border-r border-t'} ${className ?? ''}`
		} />
	);
};

const DELAY_ORDER = ['none', '150', '300'];

const ScrollArrows: React.FC<{
	toID: string;
	direction: 'up' | 'down';
	color?: 'white' | 'black';
	className?: string;
}> = ({ toID, direction, className, children, color = 'white' }) => {
	const delays = useMemo(() => {
		if (direction === 'down') {
			return DELAY_ORDER;
		}

		return DELAY_ORDER.reverse();
	}, [direction])

	return (
		<a
			className={`block text-center cursor-pointer ${className ?? ''}`}
			href={`#${toID}`}
			aria-label='Scroll down'
		>
			{delays.map((delay, index) => (
				<ScrollArrow
					key={index}
					className={`animation-delay-${delay}`}
					direction={direction}
					color={color}
				/>
			))}
			{children}
		</a>
	)
};

export default ScrollArrows;