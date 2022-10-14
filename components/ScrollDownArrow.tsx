const ScrollDownArrow = ({ className } : { className: string }) => {
	return (
		<div className={`w-[32px] h-[32px] border-b border-l border-solid border-white -rotate-45 -mb-3 animate-pulseArrow ${className ?? ''}`} />
	);
}

const ScrollDownArrows: React.FC<{
	toID: string;
}> = ({ toID }) => {
	return (
		<a
			className='block absolute bottom-10 left-[calc(50%_-_16px)] cursor-pointer'
			href={`#${toID}`}
			aria-label='Scroll down'
		>
			<ScrollDownArrow className='animation-delay-none' />
			<ScrollDownArrow className='animation-delay-150' />
			<ScrollDownArrow className='animation-delay-300' />
		</a>
	)
};

export default ScrollDownArrows;