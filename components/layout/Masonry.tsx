import React, {
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

const BREAK_POINTS = [576, 768, 1200];

const getColumns = (containerWidth: number) => {
	return (
		BREAK_POINTS.reduceRight((acc, breakPoint, i) => {
			return breakPoint < containerWidth ? acc : i;
		}, BREAK_POINTS.length) + 1
	);
};

export default function Masonry({ children }: PropsWithChildren<{}>) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [columns, setColumns] = useState(4);
	const lastRecalculation = useRef<number | null>(null);

	const updateColumns = useCallback(
		(contentBoxSize: ResizeObserverSize) => {
			if (!window || !window.requestAnimationFrame) {
				setColumns(getColumns(contentBoxSize.inlineSize));
				return;
			}

			if (window.cancelAnimationFrame && lastRecalculation.current) {
				window.cancelAnimationFrame(lastRecalculation.current);
			}

			lastRecalculation.current = window.requestAnimationFrame(() => {
				setColumns(getColumns(contentBoxSize.inlineSize));
			});
		},
		[setColumns]
	);

	useEffect(() => {
		const currentContainer = containerRef.current;

		if (currentContainer) {
			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const contentBoxSize: ResizeObserverSize = Array.isArray(
						entry.contentBoxSize
					)
						? entry.contentBoxSize[0]
						: entry.contentBoxSize;

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
		const mappedChildren = new Array(columns)
			.fill(null)
			.map(() => [] as React.ReactElement[]);

		return React.Children.toArray(children).reduce((acc, child, i) => {
			// @ts-ignore
			acc[i % columns].push(child);
			return acc;
		}, mappedChildren);
	}, [children, columns]) as React.ReactElement[][];

	const columnWidth = useMemo(() => `${100 / columns}%`, [columns]);

	return (
		<div ref={containerRef}>
			{childrenInColumns.map((column, i) => {
				return (
					<div key={i} style={{ width: columnWidth }}>
						{...column}
					</div>
				);
			})}
		</div>
	);
};
