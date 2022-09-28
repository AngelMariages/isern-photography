const ScrollDownArrow: React.FC<{
	scrollToRef: React.RefObject<HTMLDivElement>;
}> = ({ scrollToRef }) => {
	return (
		<div
			className='absolute bottom-10 left-[calc(50%_-_16px)] cursor-pointer'
			onClick={() => scrollToRef.current?.scrollIntoView({ behavior: 'smooth' })}
		>
			<div className='w-[32px] h-[32px] border-b border-l border-solid border-white -rotate-45 -mb-3 animate-pulseArrow animation-delay-none'></div>
			<div className='w-[32px] h-[32px] border-b border-l border-solid border-white -rotate-45 -mb-3 animate-pulseArrow animation-delay-150'></div>
			<div className='w-[32px] h-[32px] border-b border-l border-solid border-white -rotate-45 -mb-3 animate-pulseArrow animation-delay-300'></div>
		</div>
	)
};

export default ScrollDownArrow;