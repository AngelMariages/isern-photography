import { useMemo } from 'react';

const BORDER_BY_COLOR = {
	white: 'border-white',
	black: 'border-black',
}

const ScrollArrow = ({ className, direction, color, }: {
	className?: string,
	direction: 'up' | 'down';
	color: 'white' | 'black';
}) => {
	return (
		<div className={
			`w-[32px] h-[32px] border-solid ${BORDER_BY_COLOR[color]} -rotate-45 -mb-3 animate-pulseArrow mx-auto `
			+ `${direction === 'down' ? 'border-b border-l' : 'border-r border-t'} ${className ?? ''}`
		} />
	);
};

const DELAY_ORDER = ['animation-delay-none', 'animation-delay-150', 'animation-delay-300'];

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
					className={delay}
					direction={direction}
					color={color}
				/>
			))}
			{children}
		</a>
	)
};

export default ScrollArrows;