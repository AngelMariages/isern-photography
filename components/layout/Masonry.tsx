import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit'

const BREAK_POINTS = [576, 768, 1200];

const getColumns = (containerWidth: number) => {
	return BREAK_POINTS.reduceRight((acc, breakPoint, i) => {
		return breakPoint < containerWidth ? acc : i;
	}, BREAK_POINTS.length) + 1;
};

const Masonry: React.FC<{
	className?: string;
}> = ({
	children,
	className
}) => {
		const containerRef = useRef<HTMLDivElement>(null);
		const [columns, setColumns] = useState(4);
		const lastRecalculation = useRef<number | null>(null);

		const updateColumns = useCallback((contentBoxSize: ResizeObserverSize) => {
			if (!window || !window.requestAnimationFrame) {
				setColumns(getColumns(contentBoxSize.inlineSize));
				return;
			}

			if (window.cancelAnimationFrame && lastRecalculation.current) {
				window.cancelAnimationFrame(lastRecalculation.current);
			}

			lastRecalculation.current = window.requestAnimationFrame(() => {
				setColumns(getColumns(contentBoxSize.inlineSize));
			})
		}, [setColumns]);

		useEffect(() => {
			const currentContainer = containerRef.current;

			if (currentContainer) {
				const resizeObserver = new ResizeObserver((entries) => {
					for (const entry of entries) {
						const contentBoxSize: ResizeObserverSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;

						updateColumns(contentBoxSize);
					}
				});
				resizeObserver.observe(currentContainer);

				return () => {
					resizeObserver.unobserve(currentContainer);
				};
			}
		}, [containerRef, updateColumns]);

		const childrenInColumns = useMemo(() => {
			const mappedChildren = new Array(columns).fill(null).map(() => [] as React.ReactElement[]);

			return React.Children.toArray(children).reduce((acc, child, i) => {
				// @ts-ignore
				acc[i % columns].push(child);
				return acc;
			}, mappedChildren);
		}, [children, columns]) as React.ReactElement[][];

		const columnWidth = useMemo(() => `${100 / columns}%`, [columns]);

		return (
			<div ref={containerRef}>
				<Flipper flipKey={children} className={className} >
					{childrenInColumns.map((column, i) => {
						return (
							<div key={i} style={{ width: columnWidth }}>
								{column.map((child) => {
									return (
										<Flipped
											key={child.key}
											flipId={child.key!}
											onAppear={(el) => {
												el.classList.add('animate-fadeIn');

												el.addEventListener('animationend', () => {
													el.classList.remove("animate-fadeIn");
													el.style.opacity = '1';
												});
											}}
											onExit={(el, _, removeElement) => {
												el.classList.add('animate-fadeOut');
												el.addEventListener('animationend', removeElement);
											}}
										>
											{flippedProps => React.cloneElement(child, flippedProps)}
										</Flipped>
									);
								})}
							</div>
						);
					})}
				</Flipper>
			</div>
		);
	}

export default Masonry;
